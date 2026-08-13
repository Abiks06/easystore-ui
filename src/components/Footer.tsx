import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="anim-fade-up mt-auto border-t border-slate-200/60 bg-white/50 backdrop-blur-sm shadow-sm flex items-center justify-center gap-2 px-4 py-6 text-sm text-slate-500">
      <span className="inline-flex items-center gap-2 text-slate-500">
        Made with{" "}
        <Heart
          className="anim-heart text-fuchsia-500 w-4 h-4 fill-fuchsia-500"
          aria-hidden="true"
        />{" "}
        by{" "}
        <a
          href="https://github.com/Abiks06/Ayomide_Abikoye"
          rel="noreferrer"
          target="_blank"
          className="font-bold text-violet-600 no-underline transition-all duration-150 hover:-translate-y-0.5 hover:text-violet-800"
        >
          Abiks06
        </a>
        © {new Date().getFullYear()}
      </span>
    </footer>
  );
}
