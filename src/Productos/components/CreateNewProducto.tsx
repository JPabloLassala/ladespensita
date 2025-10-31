import { Button, Card, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NewProductoModal } from "./NewProductoModal";

export const CreateNewProducto = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card
        shadow="sm"
        padding="md"
        radius="md"
        withBorder
        mt={3}
        style={{ borderStyle: "dashed" }}
      >
        <Flex align="center" justify="center" style={{ height: "100%", origin }} onClick={open}>
          <Button variant="outline" color="gray" style={{ borderStyle: "dashed" }}>
            Crear Nuevo
          </Button>
        </Flex>
      </Card>
      <NewProductoModal opened={opened} onClose={close} />
    </>
  );
};
