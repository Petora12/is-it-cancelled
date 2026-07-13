import './SearchInput.css';

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      className="search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search a show… e.g. Firefly"
      autoFocus
    ></input>
  );
}
