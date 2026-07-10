import type { Show } from '../api/shows';
import { ResultRow } from './ResultRow';
import './SearchDropdown.css';
import Spinner from './Spinner';

type SearchDropdownProps = {
  state: 'searching' | 'results' | 'empty';
  results: Show[];
  onSelect: (result: Show) => void;
};

export const SearchDropdown = ({
  state,
  results,
  onSelect,
}: SearchDropdownProps) => {
  if (state === 'empty') return null;

  if (state === 'searching') {
    return (
      <div className="dropdown-panel dropdown-searching">
        <Spinner size={18} />
        <span className="dropdown-searching-text">searching the archives…</span>
      </div>
    );
  }

  // state === "results"
  return (
    <div className="dropdown-panel dropdown-results">
      {results.slice(0, 8).map((show) => (
        <ResultRow key={show.id} show={show} onClick={() => onSelect(show)} />
      ))}
    </div>
  );
};
