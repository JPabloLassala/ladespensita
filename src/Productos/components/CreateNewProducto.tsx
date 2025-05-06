import { Button, Card, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CreateProductoModal } from "./CreateProductoModal";
import { ProductoEntityCreate } from "../entities";

export const CreateNewProducto = ({
  onCreate,
}: {
  onCreate: (data: ProductoEntityCreate) => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card
        shadow="sm"
        padding="md"
        radius="md"
        withBorder
        mt={3}
        h={230}
        style={{ borderStyle: "dashed", aspectRatio: "1/1" }}
      >
        <Flex align="center" justify="center" style={{ height: "100%", origin }} onClick={open}>
          <Button variant="outline" color="gray" style={{ borderStyle: "dashed" }}>
            Crear Nuevo
          </Button>
        </Flex>
      </Card>
      <CreateProductoModal opened={opened} onClose={close} onCreate={onCreate} />
    </>
  );
};
