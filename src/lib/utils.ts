import { Candidato, CandidatoConVotos, Clasificacion, getClasificacion } from "@/types";

/**
 * Calculate score from votes
 * Returns 50 (MIXED) when no votes have been cast
 */
export function calculateScore(votosFrescos: number, votosPodridos: number): number {
  const total = votosFrescos + votosPodridos;
  if (total === 0) return 50; // No votes = neutral (MIXED)
  return Math.round((votosFrescos / total) * 100);
}

/**
 * Convert base candidate data to full candidate with votes
 */
export function toCandidatoConVotos(
  candidato: Candidato,
  votosFrescos: number = 0,
  votosPodridos: number = 0
): CandidatoConVotos {
  const totalVotos = votosFrescos + votosPodridos;
  const score = calculateScore(votosFrescos, votosPodridos);
  const clasificacion = getClasificacion(score);

  return {
    ...candidato,
    votosFrescos,
    votosPodridos,
    totalVotos,
    score,
    clasificacion,
  };
}

/**
 * Sort candidates by score (highest first), then by total votes
 */
export function sortByRanking(candidatos: CandidatoConVotos[]): CandidatoConVotos[] {
  return [...candidatos].sort((a, b) => {
    // First by score (descending)
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Then by total votes (descending)
    if (b.totalVotos !== a.totalVotos) {
      return b.totalVotos - a.totalVotos;
    }
    // Finally alphabetically
    return a.nombre.localeCompare(b.nombre);
  });
}

/**
 * Get badge CSS class based on classification
 */
export function getBadgeClass(clasificacion: Clasificacion): string {
  switch (clasificacion) {
    case "CERTIFIED_FRESH":
      return "badge-certified-fresh";
    case "FRESH":
      return "badge-fresh";
    case "MIXED":
      return "badge-mixed";
    case "ROTTEN":
      return "badge-rotten";
  }
}

/**
 * Format number with thousands separator
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("es-CR").format(num);
}

/**
 * Generate initials from name for avatar fallback
 */
export function getInitials(nombre: string): string {
  const parts = nombre.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return nombre.substring(0, 2).toUpperCase();
}

/**
 * Generate avatar URL with initials as fallback
 */
export function getAvatarUrl(nombre: string, colorPartido: string): string {
  const initials = getInitials(nombre);
  const bgColor = colorPartido.replace("#", "");
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=fff&size=200&bold=true`;
}

/**
 * Create share text for social media
 */
export function createShareText(candidatoNombre: string, score: number): string {
  const emoji = score >= 60 ? "🍅" : "💀";
  return `Acabo de opinar sobre ${candidatoNombre} en el Tomatómetro ${emoji} ¿Y vos? → https://tomatometro.com`;
}

/**
 * Create Twitter/X share URL
 */
export function createTwitterShareUrl(text: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

/**
 * Create WhatsApp share URL
 */
export function createWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
