import { lazy, Suspense } from "react";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ProductoEntity } from "@/Productos";
import { AlquilerFormType, AlquilerProductosFormType } from "../types";

const AlquilerSummaryPdfViewer = lazy(() =>
  import("./AlquilerSummaryPdfViewer").then((module) => ({
    default: module.AlquilerSummaryPdfViewer,
  })),
);

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
        {isModalOpen && (
          <Suspense fallback={<Text>Cargando visor PDF...</Text>}>
            <AlquilerSummaryPdfViewer form={form} alquilerForm={alquilerForm} productos={productos} />
          </Suspense>
        )}
      </Modal>
    </>
  );
};
