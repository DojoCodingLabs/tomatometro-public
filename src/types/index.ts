export type Clasificacion = "CERTIFIED_FRESH" | "FRESH" | "MIXED" | "ROTTEN";

export interface Candidato {
  id: string;
  orden: number;
  nombre: string;
  partido: string;
  siglas: string;
  colorPartido: string;
  fotoUrl: string;
  logoUrl?: string; // Optional party logo URL
}

export interface CandidatoConVotos extends Candidato {
  votosFrescos: number;
  votosPodridos: number;
  totalVotos: number;
  score: number;
  clasificacion: Clasificacion;
}

export type TipoVoto = "FRESCO" | "PODRIDO";

export interface Voto {
  id: string;
  candidatoId: string;
  tipo: TipoVoto;
  fingerprint: string;
  timestamp: Date;
  metadata: {
    region?: string;
    device?: string;
    referrer?: string;
  };
}

export interface VoteResponse {
  success: boolean;
  message: string;
  candidato?: CandidatoConVotos;
  error?: string;
}

export interface RankingResponse {
  candidatos: CandidatoConVotos[];
  totalVotos: number;
  ultimaActualizacion: string;
}

export interface StatsResponse {
  totalVotos: number;
  totalFrescos: number;
  totalPodridos: number;
  candidatoMasFresco: CandidatoConVotos | null;
  candidatoMasPodrido: CandidatoConVotos | null;
}

// Helper function to calculate classification
export function getClasificacion(score: number): Clasificacion {
  if (score >= 75) return "CERTIFIED_FRESH";
  if (score >= 60) return "FRESH";
  if (score >= 40) return "MIXED";
  return "ROTTEN";
}

// Helper function to get badge emoji
export function getBadgeEmoji(clasificacion: Clasificacion): string {
  switch (clasificacion) {
    case "CERTIFIED_FRESH":
      return "🍅✨";
    case "FRESH":
      return "🍅";
    case "MIXED":
      return "🍅❓";
    case "ROTTEN":
      return "💀";
  }
}

// Helper function to get badge label
export function getBadgeLabel(clasificacion: Clasificacion): string {
  switch (clasificacion) {
    case "CERTIFIED_FRESH":
      return "CERTIFICADO";
    case "FRESH":
      return "FRESCO";
    case "MIXED":
      return "MIXTO";
    case "ROTTEN":
      return "PODRIDO";
  }
}
