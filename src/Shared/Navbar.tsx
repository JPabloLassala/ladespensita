import { PAGES } from "@stores";
import { NavLink } from "react-router-dom";

export function Navbar() {
  const pages = Object.entries(PAGES).map(([title, href]) => ({ title, href }));

  return (
    <nav className="absolute left-1/2 flex -translate-x-1/2 flex-row justify-center">
      <ul className="flex flex-row gap-3">
        {pages.map((section) => (
          <li key={section.href}>
            <NavLink
              className="flex items-center py-2 uppercase text-gray-600 hover:text-gray-900 lg:px-3"
              to={section.href}
            >
              {section.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
