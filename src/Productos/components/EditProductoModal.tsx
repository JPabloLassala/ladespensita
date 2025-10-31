import { Button, Group, Modal, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ProductoEntity, ProductoEntityUpdate } from "../entities";
import { useState } from "react";
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
      altura: producto.medidas.altura,
      diametro: producto.medidas.diametro,
      ancho: producto.medidas.ancho,
      profundidad: producto.medidas.profundidad,
      valorUnitarioGarantia: producto.valor.unitarioGarantia,
      valorUnitarioAlquiler: producto.valor.unitarioAlquiler,
      valorx1: producto.valor.x1,
      valorx3: producto.valor.x3,
      valorx6: producto.valor.x6,
      valorx12: producto.valor.x12,
    },
  });

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

  const handleSubmitForm = (values: ProductoEntityUpdate) => {
    onUpdate({ ...values, tmpURL: tmpURL }, producto.id);

    form.reset();
    setFile(undefined);
    setUploadDirty(false);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} centered size="100%">
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
            <Button color="gray" onClick={onClose}>
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
