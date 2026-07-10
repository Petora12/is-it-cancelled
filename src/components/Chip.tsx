import './Chip.css';

type ChipProps = {
  variant: 'rating' | 'network';
  children: React.ReactNode;
};

export const Chip = ({ variant, children }: ChipProps) => {
  return (
    <span className={`chip ${variant}`}>
      {variant === 'rating' && '★ '}
      {children}
    </span>
  );
};
