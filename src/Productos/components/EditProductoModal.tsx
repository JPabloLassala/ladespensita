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
  const [file, setFile] = useState<FileWithPath | undefined>(undefined);
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
  });

  useEffect(() => {
    if (!opened) return;
    console.log("asda");
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

    if (!newFile) {
      setTmpURL(undefined);
    }
    setFile(newFile);
  };

  const handleClearFile = () => {
    setFile(undefined);
    setTmpURL(undefined);
    form.setFieldValue("file", undefined);
    setUploadDirty(true);
  };

  const handleCancel = () => {
    form.reset();
    onClose();
    setFile(undefined);
    setUploadDirty(false);
  };

  const handleSubmitForm = (values: ProductoEntityUpdate) => {
    onUpdate({ ...values, tmpURL: tmpURL }, producto.id);

    form.reset();
    setFile(undefined);
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
              file={file}
              onSetFile={handleSetFile}
              image={producto.image}
              onClearFile={handleClearFile}
              onSetTmpURL={setTmpURL}
              dirty={uploadDirty}
              setDirty={setUploadDirty}
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
