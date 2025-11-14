import { Button, Group, Modal, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ProductoEntity, ProductoEntityUpdate } from "../entities";
import { useEffect, useState } from "react";
import { FileWithPath } from "@mantine/dropzone";
import { EditProductoForm } from "./EditProductoForm";
import { UploadFileEdit } from "./UploadFileEdit";

export const EditProductoModal = ({
  onClose,
  opened,
  producto,
  onUpdate,
}: {
  onClose: () => void;
  opened: boolean;
  producto: ProductoEntity;
  onUpdate: (producto: ProductoEntityUpdate, id: number) => void;
}) => {
  const [uploadDirty, setUploadDirty] = useState(false);
  const [tmpURL, setTmpURL] = useState<string | undefined>(undefined);
  const form = useForm<ProductoEntityUpdate>({
    mode: "uncontrolled",
    initialValues: {
      id: producto.id,
      nombre: producto.nombre,
      unidadesMetroLineal: producto.unidadesMetroLineal,
      totales: producto.totales,
      medidasAltura: producto.medidasAltura,
      medidasDiametro: producto.medidasDiametro,
      medidasAncho: producto.medidasAncho,
      costoDiseno: producto.costoDiseno,
      costoGrafica: producto.costoGrafica,
      costoProducto: producto.costoProducto,
      medidasProfundidad: producto.medidasProfundidad,
      valorUnitarioGarantia: producto.valorUnitarioGarantia,
      valorUnitarioAlquiler: producto.valorUnitarioAlquiler,
      valorX1: producto.valorX1,
      valorX3: producto.valorX3,
      valorX6: producto.valorX6,
      valorX12: producto.valorX12,
    },
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

  useEffect(() => {
    if (!opened) return;
    form.setValues({
      id: producto.id,
      nombre: producto.nombre,
      unidadesMetroLineal: producto.unidadesMetroLineal,
      totales: producto.totales,
      medidasAltura: producto.medidasAltura,
      medidasDiametro: producto.medidasDiametro,
      medidasAncho: producto.medidasAncho,
      costoDiseno: producto.costoDiseno,
      costoGrafica: producto.costoGrafica,
      costoProducto: producto.costoProducto,
      medidasProfundidad: producto.medidasProfundidad,
      valorUnitarioGarantia: producto.valorUnitarioGarantia,
      valorUnitarioAlquiler: producto.valorUnitarioAlquiler,
      valorX1: producto.valorX1,
      valorX3: producto.valorX3,
      valorX6: producto.valorX6,
      valorX12: producto.valorX12,
    });
  }, [producto]);

  const handleSetFile = (newFile: FileWithPath | undefined): void => {
    form.setFieldValue("file", newFile);
  };

  const handleClearFile = () => {
    setTmpURL(undefined);
    form.setFieldValue("file", undefined);
    setUploadDirty(true);
  };

  const handleCancel = () => {
    form.reset();
    onClose();
    setUploadDirty(false);
  };

  const handleSubmitForm = (values: ProductoEntityUpdate) => {
    const valuesWithTotal: ProductoEntityUpdate = {
      ...values,
      costoTotal:
        (values?.costoDiseno || 0) + (values.costoGrafica || 0) + (values.costoProducto || 0),
    };
    onUpdate({ ...valuesWithTotal, tmpURL: tmpURL }, producto.id);
    form.reset();
    setUploadDirty(false);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="60%"
      removeScrollProps={{ enabled: false }}
    >
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Stack justify="center">
          <Group justify="center">
            <UploadFileEdit
              file={form.getValues().file}
              onSetFile={handleSetFile}
              image={producto.image}
              onClearFile={handleClearFile}
              onSetTmpURL={setTmpURL}
              dirty={uploadDirty}
              setDirty={setUploadDirty}
              error={form.errors.file}
            />
            <EditProductoForm form={form} />
          </Group>
          <Group w="100%" justify="center">
            <Button color="gray" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" color="blue">
              Guardar
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
