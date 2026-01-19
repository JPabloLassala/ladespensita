import { Button, Center, CopyButton, Modal, Text } from "@mantine/core";
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
    <PDFDownloadLink
      document={
        <AlquilerSummaryPDF alquiler={alquiler} productos={productos} alquilerProductos={form} />
      }
      fileName="greeting.pdf"
    >
      <Button>Descargar PDF</Button>
    </PDFDownloadLink>
  );
};
