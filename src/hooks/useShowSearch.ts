import { useQuery } from '@tanstack/react-query';
import { searchShows } from '../../api/shows';

export function useShowSearch(query: string) {
  return useQuery({
    queryKey: ['shows', query], // cache entry per search term
    queryFn: () => searchShows(query),
    enabled: query.trim().length >= 2, // don't fire for empty/short queries
  });
}
