import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="anim-fade-up bg-linear-to-b from-gray-100 to-white border-t border-gray-200 shadow-sm flex items-center justify-center gap-2 px-4 py-5 text-sm text-gray-500">
      <span className="inline-flex items-center gap-2 text-gray-500">
        Made with{" "}
        <FontAwesomeIcon
          icon={faHeart}
          className="anim-heart text-red-500 text-base"
          aria-hidden="true"
        />{" "}
        by{" "}
        <a
          href="https://github.com/Abiks06/Ayomide_Abikoye"
          rel="noreferrer"
          target="_blank"
          className="font-bold text-indigo-700 no-underline transition-all duration-150 hover:-translate-y-0.5 hover:text-indigo-900"
        >
          Abiks06
        </a>
        © {new Date().getFullYear()}
      </span>
    </footer>
  );
}

