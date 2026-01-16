import { NextResponse } from "next/server";
import { getSummary } from "@/lib/kv-cache";

export async function GET() {
  try {
    // Use cached summary (1 KV read instead of 48)
    const summary = await getSummary();

    // Get most fresh (highest score) and most rotten (lowest score)
    const candidatoMasFresco = summary.candidatos.length > 0 ? summary.candidatos[0] : null;
    const candidatoMasPodrido = summary.candidatos.length > 0 ? summary.candidatos[summary.candidatos.length - 1] : null;

    const response = NextResponse.json({
      success: true,
      totalVotos: summary.totalVotos,
      totalFrescos: summary.totalFrescos,
      totalPodridos: summary.totalPodridos,
      candidatoMasFresco,
      candidatoMasPodrido,
      ultimaActualizacion: summary.updatedAt,
    });

    // Cache at edge for 30 seconds, serve stale while revalidating for 60s
    response.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    return response;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Error al cargar estadísticas" },
      { status: 500 }
    );
  }
}
