import { Button, Group, Modal, Stack } from "@mantine/core";
import { UploadFile } from "./UploadFile";
import { NewProductoForm } from "./NewProductoForm";

export const NewProductoModal = ({ onClose, opened }: { onClose: () => void; opened: boolean }) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Crear nuevo" centered size="xl">
      <form>
        <Stack>
          <Group justify="center" align="start">
            <UploadFile />
            <NewProductoForm />
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
