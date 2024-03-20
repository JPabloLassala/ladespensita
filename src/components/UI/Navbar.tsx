export function Navbar() {
  const sections = [
    {
      title: "Seccion 1",
      href: "/seccion-1",
    },
    {
      title: "Seccion 2",
      href: "/seccion-2",
    },
    {
      title: "Seccion 3",
      href: "/seccion-3",
    },
  ];

  return (
    <div className="w-auto flex flex-row mt-0">
      <ul className="flex flex-row gap-3">
        {sections.map((section) => (
          <li key={section.href}>
            <a
              className="flex lg:px-3 py-2 items-center text-gray-600 hover:text-gray-900 uppercase"
              href={section.href}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
