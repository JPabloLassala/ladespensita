import { Button, Group, Modal, Stack } from "@mantine/core";
import { UploadFile } from "./UploadFile";
import { NewProductoForm } from "./NewProductoForm";
import { useForm } from "@mantine/form";
import { useProductoRepository } from "../repository";
import { ProductoEntityCreate } from "../entities";
import { useContext, useEffect, useState } from "react";
import { ProductosContext } from "../stores";
import { FileWithPath } from "@mantine/dropzone";

export const NewProductoModal = ({ onClose, opened }: { onClose: () => void; opened: boolean }) => {
  const { setProductos, productos } = useContext(ProductosContext)!;
  const { data, sendCreate } = useProductoRepository(productos);
  const [file, setFile] = useState<FileWithPath | undefined>(undefined);
  // const { getNextId } = useProductoRepository();
  const form = useForm<ProductoEntityCreate>({
    mode: "uncontrolled",
  });

  const handleSetFile = async (newFile: FileWithPath): Promise<void> => {
    form.setFieldValue("file", newFile);

    setFile(newFile);
  };

  const handleSubmitForm = async (values: ProductoEntityCreate) => {
    const formData = new FormData();
    formData.append("file", values.file as FileWithPath);
    formData.append("nombre", values.nombre);
    formData.append("unidadesMetroLineal", values.unidadesMetroLineal.toString());
    formData.append("stock", values.stock.toString());
    formData.append("disponibles", values.stock.toString());
    formData.append("altura", values.altura?.toString() || "");
    formData.append("diametro", values.diametro?.toString() || "");
    formData.append("ancho", values.ancho?.toString() || "");
    formData.append("profundidad", values.profundidad?.toString() || "");
    formData.append("valorUnitarioGarantia", values.valorUnitarioGarantia.toString());
    formData.append("valorUnitarioAlquiler", values.valorUnitarioAlquiler.toString());
    formData.append("valorx1", values.valorx1.toString());
    formData.append("valorx3", values.valorx3.toString());
    formData.append("valorx6", values.valorx6.toString());
    formData.append("valorx12", values.valorx12.toString());

    sendCreate(formData);
  };

  useEffect(() => {
    if (data) {
      setProductos(data);
    }
  }, [data]);

  return (
    <Modal opened={opened} onClose={onClose} title="Crear nuevo" centered size="100%">
      <form onSubmit={form.onSubmit(handleSubmitForm)}>
        <Stack justify="center">
          <Group justify="center">
            <UploadFile file={file} onSetFile={handleSetFile} />
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
