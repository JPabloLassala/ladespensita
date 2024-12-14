import { PAGES } from "@/Common";
import { Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const pages = Object.entries(PAGES).map(([title, href]) => ({ title, href }));

  return (
    <Group h="100%">
      {pages.map((page) => (
        <Button
          key={page.href}
          onClick={() => navigate(page.href)}
          className="flex items-center py-2 uppercase text-gray-600 hover:text-gray-900 lg:px-3"
        >
          {page.title}
        </Button>
      ))}
    </Group>
  );
}
