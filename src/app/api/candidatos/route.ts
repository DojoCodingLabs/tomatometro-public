import { NextResponse } from "next/server";
import { getSummary } from "@/lib/kv-cache";

export async function GET() {
  try {
    // Use cached summary (1 KV read instead of 24)
    const summary = await getSummary();

    const response = NextResponse.json({
      success: true,
      candidatos: summary.candidatos,
      total: summary.candidatos.length,
    });

    // Cache at edge for 30 seconds, serve stale while revalidating for 60s
    response.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    return response;
  } catch (error) {
    console.error("Error fetching candidatos:", error);
    return NextResponse.json(
      { success: false, error: "Error al cargar candidatos" },
      { status: 500 }
    );
  }
}
