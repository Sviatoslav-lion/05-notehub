import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchMovies, type TmdbSearchResponse } from '../services/movieService';

export function useMoviesQuery(query: string, page: number) {
  return useQuery<TmdbSearchResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query.length > 0,

    //
    placeholderData: keepPreviousData,
  });
}
