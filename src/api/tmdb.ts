// api/tmdb.ts — Vercel serverless function (Node). Proxies TMDB so the token
// stays server-side. Never runs in the browser.
import type { VercelRequest, VercelResponse } from '@vercel/node';

const TMDB_BASE = 'https://api.themoviedb.org/3';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  const token = process.env.TMDB_TOKEN;
  if (!token) {
    res.status(500).json({ error: 'TMDB_TOKEN is not configured' });
    return;
  }

  // req.query values are typed as string | string[] | undefined — normalize.
  const raw = req.query.path;
  const path = Array.isArray(raw) ? raw[0] : raw;
  if (!path) {
    res.status(400).json({ error: "Missing 'path' query param" });
    return;
  }

  try {
    const upstream = await fetch(`${TMDB_BASE}/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch {
    res.status(502).json({ error: 'Failed to reach TMDB' });
  }
}
