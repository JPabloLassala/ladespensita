import { Button, Center, CopyButton, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ProductoEntity } from "@/Productos";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AlquilerSummaryPDF } from "./AlquilerSummaryPDF";
import { AlquilerFormType, AlquilerProductosFormType } from "../types";

export const AlquilerSummaryPrice = ({
  form,
  alquiler,
  productos,
}: {
  form: AlquilerProductosFormType;
  alquiler: AlquilerFormType;
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
          {/* <Button onClick={handlePdf}>Descargar PDF</Button> */}
          <PDFDownloadLink
            document={<AlquilerSummaryPDF alquiler={alquiler} productos={productos} />}
            fileName="greeting.pdf"
          >
            <Button>Descargar PDF</Button>
          </PDFDownloadLink>
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
