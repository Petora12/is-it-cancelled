// components/Chip.tsx
import type { ReactNode } from 'react';
import './Chip.css';

type ChipProps = {
  variant: 'rating' | 'network';
  children: ReactNode;
};

export function Chip({ variant, children }: ChipProps) {
  return (
    <span className={`chip chip-${variant}`}>
      {variant === 'rating' && '★ '}
      {children}
    </span>
  );
}
