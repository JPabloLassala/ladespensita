import { Button, Group, Modal, Stack } from "@mantine/core";
import { UploadFileCreate } from "./UploadFileCreate";
import { CreateProductoForm } from "./CreateProductoForm";
import { useForm } from "@mantine/form";
import { ProductoEntityCreate } from "../entities";
import { useState } from "react";
import { FileWithPath } from "@mantine/dropzone";

export const CreateProductoModal = ({
  onClose,
  opened,
  onCreate,
}: {
  onClose: () => void;
  opened: boolean;
  onCreate: (data: ProductoEntityCreate) => void;
}) => {
  const [uploadDirty, setUploadDirty] = useState(false);
  const [tmpURL, setTmpURL] = useState<string | undefined>(undefined);
  const form = useForm<ProductoEntityCreate>({
    mode: "uncontrolled",
    validate: {
      nombre: (value) => (!value?.trim() ? "El nombre es obligatorio" : null),
      totales: (value) => (!value || value < 1 ? "El Stock inicial debe ser mayor a 0" : null),
      unidadesMetroLineal: (value) =>
        !value || value < 1 ? "Las unidades por metro lineal deben ser mayor a 0" : null,
      valorUnitarioGarantia: (value) =>
        !value || value < 0 ? "El valor unitario de garantía debe ser mayor o igual a 0" : null,
      valorUnitarioAlquiler: (value) =>
        !value || value < 0 ? "El valor unitario de alquiler debe ser mayor o igual a 0" : null,
      costoDiseno: (value) =>
        value === undefined || value < 0 ? "El costo de diseño debe ser mayor o igual a 0" : null,
      costoGrafica: (value) =>
        value === undefined || value < 0 ? "El costo de gráfica debe ser mayor o igual a 0" : null,
      costoProducto: (value) =>
        value === undefined || value < 0 ? "El costo de producto debe ser mayor o igual a 0" : null,
      valorX1: (value) =>
        value === undefined || value < 0 ? "El valor por 1 debe ser mayor o igual a 0" : null,
      valorX3: (value) =>
        value === undefined || value < 0 ? "El valor por 3 debe ser mayor o igual a 0" : null,
      valorX6: (value) =>
        value === undefined || value < 0 ? "El valor por 6 debe ser mayor o igual a 0" : null,
      valorX12: (value) =>
        value === undefined || value < 0 ? "El valor por 12 debe ser mayor o igual a 0" : null,
      file: (value) => (!value ? "La imagen es obligatoria" : null),
    },
  });

  const handleSetFile = (newFile: FileWithPath | undefined): void => {
    form.setFieldValue("file", newFile);
  };

  const handleSubmitForm = (values: ProductoEntityCreate) => {
    const valuesWithTotal: ProductoEntityCreate = {
      ...values,
      costoTotal: values.costoDiseno + values.costoGrafica + values.costoProducto,
    };
    onCreate({ ...valuesWithTotal, tmpURL: tmpURL });
    form.reset();
    setUploadDirty(false);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="65%"
      removeScrollProps={{ enabled: false }}
    >
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Stack justify="center">
          <Group justify="center">
            <UploadFileCreate
              file={form.getValues().file}
              onSetFile={handleSetFile}
              onSetTmpURL={setTmpURL}
              dirty={uploadDirty}
              setDirty={setUploadDirty}
              error={form.errors.file}
            />
            <CreateProductoForm form={form} />
          </Group>
          <Group w="100%" justify="center">
            <Button color="gray" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="red" onClick={() => form.reset()}>
              Reestablecer
            </Button>
            <Button type="submit" color="blue">
              Crear
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
