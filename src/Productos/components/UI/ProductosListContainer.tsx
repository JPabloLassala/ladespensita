import { SimpleGrid } from "@mantine/core";

export function ProductosListContainer({ children }: { children: React.ReactNode }) {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 5 }}
      spacing={{ base: 10, sm: "xl" }}
      verticalSpacing={{ base: "md", sm: "xl" }}
    >
      {children}
    </SimpleGrid>
  );
}
