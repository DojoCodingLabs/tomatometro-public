/**
 * Vote Storage Layer
 *
 * Redis-backed storage using Vercel KV.
 * All write operations use atomic commands.
 */

import { kv } from "@vercel/kv";
import { candidatos } from "@/data/candidatos";
import { CandidatoConVotos, TipoVoto } from "@/types";
import { toCandidatoConVotos, sortByRanking } from "./utils";

const VOTES_KEY = (candidatoId: string) => `votes:${candidatoId}`;
const RATE_LIMIT_KEY = (fingerprint: string) => `ratelimit:${fingerprint}`;
const SESSION_VOTES_KEY = (sessionId: string) => `session:${sessionId}`;

interface VoteCounts extends Record<string, unknown> {
  frescos: number;
  podridos: number;
}

export async function getVoteCounts(candidatoId: string): Promise<VoteCounts> {
  const data = await kv.hgetall<VoteCounts>(VOTES_KEY(candidatoId));
  return {
    frescos: data?.frescos ?? 0,
    podridos: data?.podridos ?? 0,
  };
}

export async function incrementVote(candidatoId: string, tipo: TipoVoto): Promise<VoteCounts> {
  const key = VOTES_KEY(candidatoId);
  const field = tipo === "FRESCO" ? "frescos" : "podridos";

  await kv.hincrby(key, field, 1);

  const data = await kv.hgetall<VoteCounts>(key);
  return {
    frescos: data?.frescos ?? 0,
    podridos: data?.podridos ?? 0,
  };
}

export async function getAllCandidatosWithVotes(): Promise<CandidatoConVotos[]> {
  const results = await Promise.all(
    candidatos.map(async (candidato) => {
      const votes = await getVoteCounts(candidato.id);
      return toCandidatoConVotos(candidato, votes.frescos, votes.podridos);
    })
  );
  return results;
}

export async function getRankedCandidatos(): Promise<CandidatoConVotos[]> {
  const candidatosWithVotes = await getAllCandidatosWithVotes();
  return sortByRanking(candidatosWithVotes);
}

export async function checkRateLimit(fingerprint: string, maxVotesPerHour: number = 100): Promise<boolean> {
  const key = RATE_LIMIT_KEY(fingerprint);
  const newCount = await kv.incr(key);

  if (newCount === 1) {
    await kv.expire(key, 3600);
  }

  return newCount <= maxVotesPerHour;
}

export async function hasSessionVoted(sessionId: string, candidatoId: string): Promise<boolean> {
  return await kv.sismember(SESSION_VOTES_KEY(sessionId), candidatoId) === 1;
}

export async function tryRecordSessionVote(sessionId: string, candidatoId: string): Promise<boolean> {
  const key = SESSION_VOTES_KEY(sessionId);
  const added = await kv.sadd(key, candidatoId);

  if (added === 1) {
    await kv.expire(key, 86400);
    return true;
  }
  return false;
}

export async function getStats(): Promise<{
  totalVotos: number;
  totalFrescos: number;
  totalPodridos: number;
}> {
  const allCandidatos = await getAllCandidatosWithVotes();

  return allCandidatos.reduce(
    (acc, c) => ({
      totalVotos: acc.totalVotos + c.totalVotos,
      totalFrescos: acc.totalFrescos + c.votosFrescos,
      totalPodridos: acc.totalPodridos + c.votosPodridos,
    }),
    { totalVotos: 0, totalFrescos: 0, totalPodridos: 0 }
  );
}

export async function kvSet(key: string, value: unknown, options?: { ex?: number }): Promise<void> {
  if (options?.ex) {
    await kv.set(key, value, { ex: options.ex });
  } else {
    await kv.set(key, value);
  }
}

export async function kvGet<T>(key: string): Promise<T | null> {
  return await kv.get<T>(key);
}

export async function kvIncr(key: string): Promise<number> {
  return await kv.incr(key);
}
