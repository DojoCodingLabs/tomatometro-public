import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { getCandidatoById } from "@/data/candidatos";
import {
  incrementVote,
  checkRateLimit,
  tryRecordSessionVote,
} from "@/lib/kv";
import { getFingerprint, getSessionId, createSessionCookie, getDeviceType } from "@/lib/fingerprint";
import { toCandidatoConVotos } from "@/lib/utils";
import { TipoVoto } from "@/types";
import { trackServerVote } from "@/lib/analytics-server";
import { updateSummary } from "@/lib/kv-cache";
import { addActivityEvent } from "@/lib/activity";
import { incrementUserStat } from "@/lib/user-stats";
import { debates } from "@/data/debates";
import { getDebateStatus, addToTimelineFromHomepage, VoteType } from "@/lib/debate";
import { captureVote } from "@/lib/data-acquisition";
import { recordVoteHistory } from "@/lib/vote-history";

export async function POST(request: NextRequest) {
  try {
    // Bot protection: Verify BotID
    const botCheck = await checkBotId();
    if (botCheck.isBot) {
      return NextResponse.json(
        { success: false, error: "Acceso denegado" },
        { status: 403 }
      );
    }

    // CSRF Protection: Validate Origin header
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin) {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        return NextResponse.json(
          { success: false, error: "Solicitud no autorizada" },
          { status: 403 }
        );
      }
    }

    const body = await request.json();
    const { candidatoId, tipo } = body as { candidatoId: string; tipo: TipoVoto };

    // Validate input
    if (!candidatoId || !tipo) {
      return NextResponse.json(
        { success: false, error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    if (tipo !== "FRESCO" && tipo !== "PODRIDO") {
      return NextResponse.json(
        { success: false, error: "Tipo de voto inválido" },
        { status: 400 }
      );
    }

    // Validate candidato exists
    const candidato = getCandidatoById(candidatoId);
    if (!candidato) {
      return NextResponse.json(
        { success: false, error: "Candidato no encontrado" },
        { status: 404 }
      );
    }

    // Get fingerprint and session
    const fingerprint = await getFingerprint();
    const sessionId = await getSessionId();

    // Check rate limit (max 100 votes per hour per IP)
    const underRateLimit = await checkRateLimit(fingerprint);
    if (!underRateLimit) {
      return NextResponse.json(
        {
          success: false,
          error: "Has dado muchas opiniones. Volvé en una hora.",
          code: "RATE_LIMIT",
        },
        { status: 429 }
      );
    }

    // Atomically check and record session vote (prevents race condition)
    // tryRecordSessionVote returns true if new vote, false if already voted
    const isNewVote = await tryRecordSessionVote(sessionId, candidatoId);
    if (!isNewVote) {
      return NextResponse.json(
        {
          success: false,
          error: "Ya opinaste sobre este candidato",
          code: "ALREADY_VOTED",
        },
        { status: 409 }
      );
    }

    // Record the vote count (only reaches here if this is a new vote)
    const newVotes = await incrementVote(candidatoId, tipo);

    // Sync to active debate if candidate is currently participating in one
    const activeDebate = debates.find(d =>
      d.candidatos.includes(candidatoId) &&
      getDebateStatus(d) === "live"
    );

    if (activeDebate) {
      const debateVoteType: VoteType = tipo === "FRESCO" ? "fresco" : "podrido";
      // Fire-and-forget: don't block homepage vote on debate sync
      addToTimelineFromHomepage(activeDebate, candidatoId, debateVoteType, sessionId).catch((err) => {
        console.error("Error syncing vote to debate timeline:", err);
      });
    }

    // Get device type for analytics (optional)
    const deviceType = await getDeviceType();
    console.log(`Vote recorded: ${candidatoId} - ${tipo} - ${deviceType}`);

    // Track server-side analytics (non-blocking)
    trackServerVote(sessionId, candidatoId, tipo, true).catch(() => {
      // Silently ignore tracking errors
    });

    // Add activity event (non-blocking)
    addActivityEvent({
      type: "vote",
      candidatoId,
      candidatoNombre: candidato.nombre,
      voto: tipo.toLowerCase() as "fresco" | "podrido",
      // Note: apodo would come from request if user has set a nickname
    }).catch(() => {
      // Silently ignore activity errors
    });

    // Update user stats for achievements (non-blocking)
    incrementUserStat(sessionId, "votes").catch(() => {
      // Silently ignore stats errors
    });

    // DojoOS: Capture vote event for unified profile (non-blocking)
    captureVote(sessionId, candidatoId, tipo, candidato.partido).catch((err) => {
      console.error("Error capturing vote event:", err);
    });

    // Record vote history for timeline (non-blocking)
    recordVoteHistory(
      sessionId,
      candidatoId,
      candidato.nombre,
      candidato.partido,
      tipo,
      undefined, // previousVote - would be set if this was a vote change
      deviceType
    ).catch((err) => {
      console.error("Error recording vote history:", err);
    });

    // Refresh cached summary (non-blocking) - ensures data freshness for other users
    updateSummary().catch((err) => {
      console.error("Error updating cache:", err);
    });

    // Return updated candidato
    const candidatoConVotos = toCandidatoConVotos(
      candidato,
      newVotes.frescos,
      newVotes.podridos
    );

    const response = NextResponse.json({
      success: true,
      message: "¡Tu opinión cuenta!",
      candidato: candidatoConVotos,
    });

    // Set session cookie
    response.headers.set("Set-Cookie", createSessionCookie(sessionId));

    return response;
  } catch (error) {
    console.error("Error recording vote:", error);
    return NextResponse.json(
      { success: false, error: "Error al registrar voto" },
      { status: 500 }
    );
  }
}
