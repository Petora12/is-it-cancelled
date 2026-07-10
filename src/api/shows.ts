export interface Show {
  id: number | string;
  title: string;
  year: number | null;
  poster: string | null;
  genres: string[];
  status: Status;
  rawStatus: string;
}

export type Status =
  | 'running'
  | 'ended'
  | 'cancelled'
  | 'in_development'
  | 'unknown';
