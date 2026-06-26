import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTags } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="anim-header sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <a href="./" className="flex items-center gap-2.5 group no-underline">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 shadow-md group-hover:shadow-violet-300 transition-shadow duration-300">
            <FontAwesomeIcon icon={faTags} className="text-white text-sm" />
          </span>
          <span className="brand-shimmer text-xl font-bold tracking-tight">
            Abiks' Store
          </span>
        </a>

        {/* Nav */}
        <nav>
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {["Home", "About", "Contact", "Login"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase()}`}
                  className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-violet-700 no-underline rounded-lg transition-colors duration-200 hover:bg-violet-50 group"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/cart"
                className="anim-pulse-ring flex items-center gap-2 ml-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-500 rounded-xl shadow-md hover:shadow-violet-300 hover:scale-105 transition-all duration-300 no-underline group"
              >
                <FontAwesomeIcon icon={faShoppingBasket} className="text-sm transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125" />
                Cart
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;