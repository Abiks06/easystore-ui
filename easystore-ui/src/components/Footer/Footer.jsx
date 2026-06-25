import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      Made with{" "}
      <FontAwesomeIcon
        icon={faHeart}
        className="footer-icon"
        aria-hidden="true"
      />{" "}
      by{" "}
      <a
        href="https://github.com/Abiks06/Ayomide_Abikoye"
        rel="noreferrer"
        target="_blank"
      >
        Abiks06© {new Date().getFullYear()} 
      </a>
    </footer>
  );
}
