// pages/Home.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useShowSearch } from '../hooks/useShowSearch';
import { SearchView } from '../components/SearchView';

export function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 1000);
  const { data: results = [], isFetching } = useShowSearch(debouncedQuery);

  const isSettling = query.trim() !== debouncedQuery.trim();
  const dropdownState =
    query.trim().length < 2
      ? 'empty'
      : isSettling || isFetching
        ? 'searching'
        : results.length > 0
          ? 'results'
          : 'empty';

  return (
    <SearchView
      query={query}
      onChange={setQuery}
      dropdownState={dropdownState}
      results={results}
      onSelect={(show) => navigate(`/show/${show.id}`)}
    />
  );
}
