import { Button, Group, Modal, Stack } from "@mantine/core";
import { UploadFile } from "./UploadFile";
import { NewProductoForm } from "./NewProductoForm";
import { useForm } from "@mantine/form";
import { ProductoEntityCreate } from "../entities";
import { useState } from "react";
import { FileWithPath } from "@mantine/dropzone";

export const NewProductoModal = ({
  onClose,
  opened,
  onCreate,
}: {
  onClose: () => void;
  opened: boolean;
  onCreate: (data: ProductoEntityCreate) => void;
}) => {
  const [file, setFile] = useState<FileWithPath | undefined>(undefined);
  const [tmpURL, setTmpURL] = useState<string | undefined>(undefined);

  const form = useForm<ProductoEntityCreate>({
    mode: "uncontrolled",
  });

  const handleSetFile = (newFile: FileWithPath): void => {
    form.setFieldValue("file", newFile);

    setFile(newFile);
  };

  const handleSubmitForm = (values: ProductoEntityCreate) => {
    onCreate({ ...values, tmpURL: tmpURL });
    form.reset();
    setFile(undefined);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Crear nuevo" centered size="100%">
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Stack justify="center">
          <Group justify="center">
            <UploadFile file={file} onSetFile={handleSetFile} onSetTmpURL={setTmpURL} />
            <NewProductoForm form={form} />
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
