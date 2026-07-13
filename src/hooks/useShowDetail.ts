import { useQuery } from '@tanstack/react-query';
import { getShowDetail } from '../../api/shows';

export function useShowDetail(id: number | null) {
  return useQuery({
    queryKey: ['show', id],
    queryFn: () => getShowDetail(id as number),
    enabled: id != null,
  });
}
