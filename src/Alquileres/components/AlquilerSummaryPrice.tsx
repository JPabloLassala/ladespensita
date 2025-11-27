import { Button, Center, CopyButton, Group, Modal, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { AlquilerProductoCreate, AlquilerProductoUpdate } from "../entities";
import { useDisclosure } from "@mantine/hooks";
import { ProductoEntity } from "@/Productos";

type AlquilerProductosFormType = UseFormReturnType<
  {
    productos: Record<number, AlquilerProductoUpdate | AlquilerProductoCreate>;
  },
  (values: { productos: Record<number, AlquilerProductoUpdate | AlquilerProductoCreate> }) => {
    productos: Record<number, AlquilerProductoUpdate | AlquilerProductoCreate>;
  }
>;

export const AlquilerSummaryPrice = ({
  form,
  productos,
}: {
  form: AlquilerProductosFormType;
  productos: ProductoEntity[];
}) => {
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const alquilerProductos = Object.values(form.values.productos).filter((v) => v.cantidad > 0);
  const text = alquilerProductos
    .map((ap) => {
      const producto = productos.find((p) => p.id === ap.productoId);
      if (!producto) return "";
      return `${producto.nombre} x${ap.cantidad}: $${ap.precioFinal}`;
    })
    .join("\n");

  return (
    <>
      <Button onClick={open}>Mostrar resumen</Button>
      <Modal size="auto" opened={isModalOpen} onClose={close}>
        {alquilerProductos.map((ap) => {
          const producto = productos.find((p) => p.id === ap.productoId);
          if (!producto) return null;
          return (
            <Text key={ap.productoId}>
              {producto.nombre} x{ap.cantidad}: ${ap.precioFinal}
            </Text>
          );
        })}
        <Center w="100%" mt="lg">
          <CopyButton value={text} timeout={1000}>
            {({ copied, copy }) => (
              <Button onClick={copy} color={copied ? "teal" : "blue"}>
                {copied ? "Copiado" : "Copiar al portapapeles"}
              </Button>
            )}
          </CopyButton>
        </Center>
      </Modal>
    </>
  );
};
