import { Button, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ProductoEntity } from "@/Productos";
import { PDFViewer } from "@react-pdf/renderer";
import { AlquilerSummaryPDF } from "./AlquilerSummaryPDF";
import { AlquilerFormType, AlquilerProductosFormType } from "../types";

export const AlquilerSummaryExport = ({
  form,
  alquilerForm,
  productos,
}: {
  form: AlquilerProductosFormType;
  alquilerForm: AlquilerFormType;
  productos: ProductoEntity[];
}) => {
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const selectedProductosLength = Object.values(form.values.productos).filter(
    (p) => p.cantidad > 0,
  ).length;

  return (
    <>
      <Stack justify="start" h="100%">
        {selectedProductosLength === 0 && (
          <Button size="lg" disabled>
            Lista vacía
          </Button>
        )}
        {selectedProductosLength > 0 && (
          <Button onClick={open} size="lg">
            Ver PDF
          </Button>
        )}
      </Stack>
      <Modal
        opened={isModalOpen}
        onClose={close}
        size="90%"
        title={<Text fw={600}>Presupuesto</Text>}
      >
        <PDFViewer style={{ width: "100%", height: "80vh" }}>
          <AlquilerSummaryPDF
            alquilerForm={alquilerForm}
            productos={productos}
            alquilerProductos={form}
          />
        </PDFViewer>
      </Modal>
    </>
  );
};
