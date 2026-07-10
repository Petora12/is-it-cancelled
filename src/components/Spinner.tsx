import './Spinner.css';

const Spinner = ({ size = 18 }: { size?: number }) => {
  return <div className="spinner" style={{ width: size, height: size }}></div>;
};

export default Spinner;
