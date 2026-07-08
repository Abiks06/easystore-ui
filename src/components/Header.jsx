import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTags } from "@fortawesome/free-solid-svg-icons";

const navLinks = ["Home", "About", "Contact", "Login"];

const navLinkClass = ({ isActive }) =>
  `relative px-4 py-2 text-sm font-medium no-underline rounded-lg transition-colors duration-200 group ${
    isActive
      ? "text-violet-700 bg-violet-50"
      : "text-slate-600 hover:text-violet-700 hover:bg-violet-50"
  }`;

const Header = () => {
  return (
    <header className="anim-header sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group no-underline">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-violet-600 to-indigo-500 shadow-md group-hover:shadow-violet-300 transition-shadow duration-300">
            <FontAwesomeIcon icon={faTags} className="text-white text-sm" />
          </span>
          <span className="brand-shimmer text-xl font-bold tracking-tight">
            Abiks' Store
          </span>
        </Link>

        {/* Nav */}
        <nav>
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {navLinks.map((item) => (
              <li key={item}>
                <NavLink
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  end={item === "Home"}
                  className={navLinkClass}
                >
                  {item}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/cart"
                className="anim-pulse-ring flex items-center gap-2 ml-2 px-4 py-2 text-sm font-semibold text-white bg-linear-to-r from-violet-600 to-indigo-500 rounded-xl shadow-md hover:shadow-violet-300 hover:scale-105 transition-all duration-300 no-underline group"
              >
                <FontAwesomeIcon icon={faShoppingBasket} className="text-sm transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125" />
                Cart
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;