import { NextRequest, NextResponse } from "next/server";
import { getSummary } from "@/lib/kv-cache";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit") || "20";
    // Validate and sanitize limit parameter (1-100)
    const limit = Math.min(Math.max(parseInt(limitParam, 10) || 20, 1), 100);

    // Use cached summary (1 KV read instead of 24)
    const summary = await getSummary();
    const limitedCandidatos = summary.candidatos.slice(0, limit);

    const response = NextResponse.json({
      success: true,
      candidatos: limitedCandidatos,
      totalVotos: summary.totalVotos,
      ultimaActualizacion: summary.updatedAt,
    });

    // Cache at edge for 30 seconds, serve stale while revalidating for 60s
    response.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    return response;
  } catch (error) {
    console.error("Error fetching ranking:", error);
    return NextResponse.json(
      { success: false, error: "Error al cargar ranking" },
      { status: 500 }
    );
  }
}
