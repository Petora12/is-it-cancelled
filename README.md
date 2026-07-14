# Is It Cancelled?

A single-page web app to check whether a TV show has been **renewed**, has
**ended**, was **cancelled**, or is still **undecided**. Search for a show, pick
it from the results, and get a clear verdict.

The app deliberately distinguishes **"cancelled"** (axed before its time) from
**"ended"** (finished its natural run) — a distinction the underlying data
source (TMDB) makes and most status checkers don't.

<!-- Replace with your live URL -->

**Live:** https://is-it-cancelled.vercel.app/

## Features

- Debounced live search with an autocomplete dropdown
- Detail page with poster, genres, network, rating, and season/episode stats
- Four-state verdict (renewed / ended / cancelled / undecided) with a glowing UI
- Shareable URLs — every show has its own `/show/:id` route
- TMDB API key kept server-side via a serverless proxy (never exposed to the browser)

## Tech stack

- **Vite** + **React** + **TypeScript**
- **TanStack Query** (React Query) for data fetching, caching, and loading states
- **React Router** for navigation
- Plain CSS with a token-based design system (CSS custom properties)
- **TMDB API** as the data source, proxied through a **Vercel serverless function**

## Getting started

### Prerequisites

- Node.js 18+
- A free [TMDB](https://www.themoviedb.org/) account and API **Read Access Token**
  (Settings → API → request a Developer key)

### Install

```bash
git clone https://github.com/your-username/is-it-cancelled.git
cd is-it-cancelled
npm install
```

### Environment

Create a `.env` file in the project root with your TMDB token (no `VITE_`
prefix — it's used server-side only):

```
TMDB_TOKEN=your_tmdb_read_access_token
```

### Run locally

Because the app uses a serverless function to proxy TMDB, run it with the Vercel
CLI (which serves the frontend and the `/api` function together):

```bash
npm i -g vercel
vercel dev
```

Then open the URL it prints (usually http://localhost:3000).

## How it works

The browser never talks to TMDB directly. Requests go to a serverless function
at `/api/tmdb`, which attaches the token server-side and forwards them to TMDB.
Responses are normalized in `src/api/shows.ts` into a consistent shape, so the
UI components stay decoupled from the API's structure.

TMDB's status values are mapped to four verdicts:

| TMDB status                                        | Verdict   |
| -------------------------------------------------- | --------- |
| Returning Series / In Production / Planned / Pilot | Renewed   |
| Ended                                              | Ended     |
| Canceled                                           | Cancelled |
| _(anything else)_                                  | Undecided |

## Deployment

Deployed on [Vercel](https://vercel.com). Set `TMDB_TOKEN` as an environment
variable in the project settings (Settings → Environment Variables), then deploy.

## Attribution

This website uses TMDB and the TMDB APIs but is not endorsed, certified, or
otherwise approved by TMDB.

Data and images provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).
