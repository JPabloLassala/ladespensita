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
  });

  if (!form.isDirty()) {
    form.setFieldValue("id", producto.id);
    form.setFieldValue("nombre", producto.nombre);
    form.setFieldValue("unidadesMetroLineal", producto.unidadesMetroLineal);
    form.setFieldValue("totales", producto.totales);
    form.setFieldValue("medidasAltura", producto.medidasAltura);
    form.setFieldValue("medidasDiametro", producto.medidasDiametro);
    form.setFieldValue("medidasAncho", producto.medidasAncho);
    form.setFieldValue("medidasProfundidad", producto.medidasProfundidad);
    form.setFieldValue("valorUnitarioGarantia", producto.valorUnitarioGarantia);
    form.setFieldValue("valorUnitarioAlquiler", producto.valorUnitarioAlquiler);
    form.setFieldValue("valorX1", producto.valorX1);
    form.setFieldValue("valorX3", producto.valorX3);
    form.setFieldValue("valorX6", producto.valorX6);
    form.setFieldValue("valorX12", producto.valorX12);
  }

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
