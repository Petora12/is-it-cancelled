import type { Show } from '../api/shows';
import { SearchDropdown } from '../components/SearchDropdown';
import { SearchInput } from '../components/SearchInput';
import './SearchView.css';

const FAKE_RESULTS: Show[] = [
  {
    id: 180,
    title: 'Firefly',
    year: 2002,
    poster: null,
    genres: ['Drama', 'Science-Fiction'],
    status: 'ended',
    rawStatus: 'Ended',
  },
  {
    id: 41428,
    title: 'The Mandalorian',
    year: 2019,
    poster: null,
    genres: ['Action', 'Science-Fiction', 'Adventure'],
    status: 'running',
    rawStatus: 'Running',
  },
];

export const SearchView = () => {
  return (
    <div className="view">
      <div className="eyebrow">TV Status Check</div>
      <h1 className="title">Is it Cancelled?</h1>
      <p className="subtitle">
        Type a show name. Find out if it lives to see another season — or if
        it's gone for good.
      </p>
      <div className="search-box">
        <SearchInput value="fire" onChange={() => {}} />
        <SearchDropdown
          state="results"
          results={FAKE_RESULTS}
          onSelect={() => {}}
        />
      </div>
    </div>
  );
};
