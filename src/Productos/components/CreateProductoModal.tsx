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
  const [file, setFile] = useState<FileWithPath | undefined>(undefined);
  const [tmpURL, setTmpURL] = useState<string | undefined>(undefined);
  const form = useForm<ProductoEntityCreate>({ mode: "uncontrolled" });

  const handleSetFile = (newFile: FileWithPath | undefined): void => {
    form.setFieldValue("file", newFile);

    setFile(newFile);
  };

  const handleSubmitForm = (values: ProductoEntityCreate) => {
    const valuesWithTotal: ProductoEntityCreate = {
      ...values,
      costoTotal: values.costoDiseno + values.costoGrafica + values.costoProducto,
    };
    onCreate({ ...valuesWithTotal, tmpURL: tmpURL });
    form.reset();
    setFile(undefined);
    setUploadDirty(false);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} centered size="65%">
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Stack justify="center">
          <Group justify="center">
            <UploadFileCreate
              file={file}
              onSetFile={handleSetFile}
              onSetTmpURL={setTmpURL}
              dirty={uploadDirty}
              setDirty={setUploadDirty}
            />
            <CreateProductoForm form={form} />
          </Group>
          <Group w="100%" justify="center">
            <Button color="gray" onClick={onClose}>
              Cancelar
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
