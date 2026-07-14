import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <a
        className="footer-link"
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noreferrer"
      >
        <img className="footer-logo" src="/tmdb-logo.svg" alt="TMDB" />
      </a>
      <span className="footer-text">
        This website uses TMDB and the TMDB APIs but is not endorsed, certified,
        or otherwise approved by TMDB.
      </span>
    </footer>
  );
}
