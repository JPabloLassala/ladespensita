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
    <div className="mt-0 flex w-auto flex-row">
      <ul className="flex flex-row gap-3">
        {sections.map((section) => (
          <li key={section.href}>
            <a
              className="flex items-center py-2 uppercase text-gray-600 hover:text-gray-900 lg:px-3"
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
