const IMG = 'https://image.tmdb.org/t/p'; // image URLs are public, e.g. `${IMG}/w342${poster_path}`

// All API calls go through your own serverless function, which attaches the
// token server-side. encodeURIComponent wraps the whole sub-path (incl. its
// own ?query=…) into one safe value.
async function tmdb(path: string): Promise<Response> {
  return fetch(`/api/tmdb?path=${encodeURIComponent(path)}`);
}

// --- canonical types --------------------------------------------------------

export type Status =
  | 'running'
  | 'ended'
  | 'cancelled'
  | 'in_development'
  | 'unknown';

export interface Show {
  id: number;
  title: string;
  year: number | null;
  poster: string | null;
  genres: string[];
  status: Status;
  rawStatus: string;
}

// --- search -----------------------------------------------------------------
// TMDB search returns genre_ids (numbers), not names, and carries NO status.
// So we translate ids via a cached genre map, and leave status as a placeholder
// (the real status is only available from getShowDetail).

interface TmdbSearchResult {
  id: number;
  name: string;
  first_air_date: string | null;
  poster_path: string | null;
  genre_ids: number[];
}

export async function searchShows(query: string): Promise<Show[]> {
  const res = await tmdb(
    `search/tv?query=${encodeURIComponent(query)}&include_adult=false`,
  );
  if (!res.ok) throw new Error(`Search failed (${res.status})`);

  const data = (await res.json()) as { results: TmdbSearchResult[] };
  const genreMap = await getTvGenreMap();
  return data.results.slice(0, 8).map((r) => normalizeSearch(r, genreMap));
}

function normalizeSearch(
  r: TmdbSearchResult,
  genreMap: Map<number, string>,
): Show {
  return {
    id: r.id,
    title: r.name,
    year: r.first_air_date ? Number(r.first_air_date.slice(0, 4)) : null,
    poster: r.poster_path ? `${IMG}/w185${r.poster_path}` : null,
    genres: r.genre_ids
      .map((id) => genreMap.get(id))
      .filter((g): g is string => Boolean(g)),
    status: 'unknown', // placeholder — TMDB search has no status
    rawStatus: '',
  };
}

// Genre id -> name map, fetched once and cached for the session.
let genreCache: Map<number, string> | null = null;

async function getTvGenreMap(): Promise<Map<number, string>> {
  if (genreCache) return genreCache;
  const res = await tmdb('genre/tv/list');
  if (!res.ok) throw new Error('Genre list failed');
  const data = (await res.json()) as {
    genres: { id: number; name: string }[];
  };
  genreCache = new Map(data.genres.map((g) => [g.id, g.name]));
  return genreCache;
}

// --- detail (needed for the verdict — status lives only here) ---------------

export interface ShowDetail {
  id: number;
  title: string;
  poster: string | null;
  genres: string[];
  premiered: string;
  endedLabel: string; // a date, "Ongoing", or "—"
  seasons: number | null;
  episodes: number | null;
  rating: number | null;
  network: string;
  summary: string;
  status: Status;
  rawStatus: string;
}

interface TmdbDetail {
  id: number;
  name: string;
  poster_path: string | null;
  genres: { id: number; name: string }[];
  first_air_date: string | null;
  last_air_date: string | null;
  number_of_seasons: number | null;
  number_of_episodes: number | null;
  vote_average: number | null;
  overview: string;
  status: string;
  networks: { name: string }[];
}

export async function getShowDetail(id: number): Promise<ShowDetail> {
  const res = await tmdb(`tv/${id}`);
  if (!res.ok) throw new Error(`Detail failed (${res.status})`);

  const s = (await res.json()) as TmdbDetail;
  const status = mapTmdbStatus(s.status);
  const finished = status === 'ended' || status === 'cancelled';

  return {
    id: s.id,
    title: s.name,
    poster: s.poster_path ? `${IMG}/w342${s.poster_path}` : null,
    genres: s.genres.map((g) => g.name),
    premiered: s.first_air_date || '—',
    endedLabel: finished ? s.last_air_date || '—' : 'Ongoing',
    seasons: s.number_of_seasons ?? null,
    episodes: s.number_of_episodes ?? null,
    // TMDB rating is 0–10 with a long decimal; round to one place.
    rating: s.vote_average ? Math.round(s.vote_average * 10) / 10 : null,
    network: s.networks?.[0]?.name ?? '—',
    // TMDB overview is plain text (no HTML to strip, unlike TVMaze).
    summary: s.overview?.trim() || 'No synopsis available for this show yet.',
    status,
    rawStatus: s.status,
  };
}

function mapTmdbStatus(raw: string): Status {
  switch (raw) {
    case 'Returning Series':
      return 'running';
    case 'Ended':
      return 'ended';
    case 'Canceled':
      return 'cancelled';
    case 'In Production':
    case 'Planned':
    case 'Pilot':
      return 'in_development';
    default:
      return 'unknown';
  }
}

// --- verdict (works off canonical Status; 'cancelled' now actually fires) ----

export type Tone = 'good' | 'bad' | 'neutral';
export interface Verdict {
  tone: Tone;
  message: string;
}

export function getVerdict(show: { title: string; status: Status }): Verdict {
  switch (show.status) {
    case 'running':
    case 'in_development':
      return { tone: 'good', message: `${show.title} is still on the air.` };
    case 'cancelled':
      return { tone: 'bad', message: `${show.title} was cancelled.` };
    case 'ended':
      return {
        tone: 'neutral',
        message: `${show.title} has ended (it ran its course).`,
      };
    default:
      return { tone: 'neutral', message: `Status unknown for ${show.title}.` };
  }
}
