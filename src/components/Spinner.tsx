import './Spinner.css';

export function Spinner({ size = 18 }: { size?: number }) {
  return <div className="spinner" style={{ width: size, height: size }}></div>;
}
