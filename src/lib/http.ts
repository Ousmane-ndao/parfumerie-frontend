/** Utilitaires HTTP — safe côté client et serveur (aucune dépendance DB). */

export function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, init);
}

export function unauthorized(message = "Non autorisé") {
  return json({ error: message }, { status: 401 });
}

export function badRequest(message: string) {
  return json({ error: message }, { status: 400 });
}

export function tooManyRequests(message: string, retryAfterSec?: number) {
  const headers: HeadersInit = {};
  if (retryAfterSec != null) headers["Retry-After"] = String(retryAfterSec);
  return json({ error: message }, { status: 429, headers });
}
