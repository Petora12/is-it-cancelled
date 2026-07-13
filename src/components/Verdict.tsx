// components/Verdict.tsx — the signature piece. Takes the canonical Status and
// renders the right glyph/color/copy. in_development folds into the running look.
import type { CSSProperties } from 'react';
import type { Status } from '../api/shows';
import './Verdict.css';

type DisplayKind = 'running' | 'ended' | 'cancelled' | 'unknown';

type VerdictConfig = {
  glyph: string;
  size: number;
  colorVar: string;
  glowRgbVar: string;
  headline: string;
  caption: string;
  captionColor: string;
  headlineMarginTop: number;
};

const VERDICTS: Record<DisplayKind, VerdictConfig> = {
  running: {
    glyph: '✓',
    size: 300,
    colorVar: '--verdict-green',
    glowRgbVar: '--verdict-green-rgb',
    headline: "It's good! :)",
    caption: 'RENEWED · STILL ON THE AIR',
    captionColor: '#7de9bd',
    headlineMarginTop: 6,
  },
  ended: {
    glyph: '■',
    size: 210,
    colorVar: '--verdict-amber',
    glowRgbVar: '--verdict-amber-rgb',
    headline: "It's over :')",
    caption: 'RAN ITS COURSE · ENDED, NOT CANCELLED',
    captionColor: '#f3cd8f',
    headlineMarginTop: 26,
  },
  cancelled: {
    glyph: '✕',
    size: 300,
    colorVar: '--verdict-red',
    glowRgbVar: '--verdict-red-rgb',
    headline: "It's cancelled :'(",
    caption: 'AXED · GONE FOR GOOD',
    captionColor: '#ff9aa4',
    headlineMarginTop: 6,
  },
  unknown: {
    glyph: '?',
    size: 300,
    colorVar: '--accent',
    glowRgbVar: '--accent-rgb',
    headline: 'Up in the air :/',
    caption: 'FATE NOT YET DECIDED',
    captionColor: '#9fe9f5',
    headlineMarginTop: 6,
  },
};

export function Verdict({ status }: { status: Status }) {
  const kind: DisplayKind = status === 'in_development' ? 'running' : status;
  const v = VERDICTS[kind];

  // per-kind values handed to the CSS as custom properties
  const style = {
    '--glyph-color': `var(${v.colorVar})`,
    '--glow-rgb': `var(${v.glowRgbVar})`,
    '--glyph-size': `${v.size}px`,
  } as CSSProperties;

  return (
    <div className="verdict" style={style}>
      <div className="verdict-glyph">{v.glyph}</div>
      <div
        className="verdict-headline"
        style={{ marginTop: v.headlineMarginTop }}
      >
        {v.headline}
      </div>
      <div className="verdict-caption" style={{ color: v.captionColor }}>
        {v.caption}
      </div>
    </div>
  );
}
