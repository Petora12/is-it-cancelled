import type { Show } from '../../api/shows';
import { SearchDropdown } from './SearchDropdown';
import { SearchInput } from './SearchInput';
import './SearchView.css';

type SearchViewProps = {
  query: string;
  onChange: (value: string) => void;
  dropdownState: 'searching' | 'results' | 'empty';
  results: Show[];
  onSelect: (show: Show) => void;
};

export function SearchView({
  query,
  onChange,
  dropdownState,
  results,
  onSelect,
}: SearchViewProps) {
  return (
    <div className="view">
      <div className="eyebrow">TV Status Check</div>
      <h1 className="title">Is it Cancelled?</h1>
      <p className="subtitle">
        Type a show name. Find out if it lives to see another season — or if
        it's gone for good.
      </p>
      <div className="search-box">
        <SearchInput value={query} onChange={onChange} />
        <SearchDropdown
          state={dropdownState}
          results={results}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}
