import { useContext } from "react";
import { PAGES, PageContext } from "../../stores/Page.context";

export function Navbar() {
  const { setPage } = useContext(PageContext);
  const pages = Object.entries(PAGES).map(([title, href]) => ({ title, href }));

  function navigateToPage(event) {
    event.preventDefault();
    const href = event.target.getAttribute("href");
    setPage(href);
  }

  return (
    <nav className="absolute left-1/2 flex -translate-x-1/2 flex-row justify-center">
      <ul className="flex flex-row gap-3">
        {pages.map((section) => (
          <li key={section.href}>
            <a
              className="flex items-center py-2 uppercase text-gray-600 hover:text-gray-900 lg:px-3"
              href={section.href}
              onClick={navigateToPage}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
