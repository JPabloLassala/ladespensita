import { Button, Card, Center, Flex } from "@mantine/core";
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
        radius="md"
        onClick={open}
        style={{
          borderStyle: "solid",
          borderColor: "lightgray",
          cursor: "pointer",
        }}
      >
        <Center h="100%">
          <Button variant="outline" color="gray" style={{ borderStyle: "dashed" }}>
            Crear Nuevo
          </Button>
        </Center>
      </Card>
      <CreateProductoModal opened={opened} onClose={close} onCreate={onCreate} />
    </>
  );
};
