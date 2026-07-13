// components/DetailView.tsx — presentational. Takes a ShowDetail + loading flag,
// renders the detail page. No fetching, no state.
import type { ShowDetail } from '../../api/shows';
import { Chip } from './Chip';
import { StatCard } from './StatCard';
import { Verdict } from './Verdict';
import { Spinner } from './Spinner';
import { PLACEHOLDER } from '../shared/constants';
import './DetailView.css';

type DetailViewProps = {
  detail: ShowDetail | null;
  loading: boolean;
  onBack: () => void;
};

export function DetailView({ detail, loading, onBack }: DetailViewProps) {
  return (
    <div className="detail-view">
      <button type="button" className="detail-back" onClick={onBack}>
        ← NEW SEARCH
      </button>

      {loading || !detail ? (
        <div className="detail-loading">
          <Spinner size={22} />
          <span className="detail-loading-text">pulling the file…</span>
        </div>
      ) : (
        <div className="detail-grid">
          <div className="detail-left">
            <div className="detail-header">
              <img
                className="detail-poster"
                src={detail.poster ?? PLACEHOLDER}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = PLACEHOLDER;
                }}
              />
              <div className="detail-heading">
                <div className="detail-genres">
                  {detail.genres.join(' · ') || 'Show'}
                </div>
                <h2 className="detail-name">{detail.title}</h2>
                <div className="detail-chips">
                  {detail.rating != null && (
                    <Chip variant="rating">{detail.rating}</Chip>
                  )}
                  <Chip variant="network">{detail.network}</Chip>
                </div>
              </div>
            </div>

            <div className="detail-stats">
              <StatCard label="Premiered" value={detail.premiered} />
              <StatCard label="Ended" value={detail.endedLabel} />
              {detail.seasons != null && (
                <StatCard label="Seasons" value={String(detail.seasons)} />
              )}
              {detail.episodes != null && (
                <StatCard label="Episodes" value={String(detail.episodes)} />
              )}
            </div>

            <p className="detail-synopsis">{detail.summary}</p>
          </div>

          <div className="detail-right">
            <Verdict status={detail.status} />
          </div>
        </div>
      )}
    </div>
  );
}
