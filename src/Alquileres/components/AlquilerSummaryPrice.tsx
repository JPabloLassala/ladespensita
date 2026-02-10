import { Button, CopyButton, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ProductoEntity } from "@/Productos";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
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
      <Group>
        <CopyButton value={text || ""}>
          {({ copied, copy }) => (
            <Button variant="outline" onClick={copy} disabled={!text}>
              {copied ? "Copiado" : "Copiar resumen"}
            </Button>
          )}
        </CopyButton>
        <Button onClick={open}>Ver PDF</Button>
        <PDFDownloadLink
          document={
            <AlquilerSummaryPDF
              alquiler={alquiler}
              productos={productos}
              alquilerProductos={form}
            />
          }
          fileName="presupuesto-alquiler.pdf"
        >
          {({ loading }) => (
            <Button disabled={loading}>{loading ? "Generando PDF..." : "Descargar PDF"}</Button>
          )}
        </PDFDownloadLink>
      </Group>
      <Modal
        opened={isModalOpen}
        onClose={close}
        size="90%"
        title={<Text fw={600}>Presupuesto</Text>}
      >
        <PDFViewer style={{ width: "100%", height: "80vh" }}>
          <AlquilerSummaryPDF alquiler={alquiler} productos={productos} alquilerProductos={form} />
        </PDFViewer>
      </Modal>
    </>
  );
};
