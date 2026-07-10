import type { Show } from '../api/shows';
import { PLACEHOLDER } from '../shared/constants';
import './ResultRow.css';

export const ResultRow = ({
  show,
  onClick,
}: {
  show: Show;
  onClick: () => void;
}) => {
  const genres = show.genres.slice(0, 3).join(' · ') || '—';

  return (
    <button type="button" className="row" onClick={onClick}>
      <img
        src={show.poster ?? PLACEHOLDER}
        alt=""
        className="thumb"
        onError={(e) => {
          e.currentTarget.src = PLACEHOLDER;
        }}
      />
      <div className="info">
        <div className="name">
          {show.title}
          <span className="year"> {show.year ?? '—'}</span>
        </div>
        <div className="genres">{genres}</div>
      </div>
    </button>
  );
};
