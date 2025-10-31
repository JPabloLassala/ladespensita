import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Flex, Group, Popover, Stack, Text } from "@mantine/core";

export function DeleteAlquilerModal({
  isModalOpen,
  onAccept,
  onCloseModal,
  children,
}: {
  isModalOpen: boolean;
  onAccept: () => void;
  onCloseModal: () => void;
  children: React.ReactNode;
}) {
  return (
    <Popover
      position="bottom-end"
      withArrow
      arrowPosition="center"
      shadow="md"
      radius="md"
      clickOutsideEvents={["mouseup", "touchend"]}
      styles={{ dropdown: { border: "2px solid lightgray" } }}
      onDismiss={onCloseModal}
      opened={isModalOpen}
      onClose={onCloseModal}
    >
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown>
        <Stack component="div" gap="2rem">
          <Stack component="div">
            <Text fw={700}>¿Estás segur@ de que querés borrar este alquiler?</Text>
            <Text size="sm">Esta acción no se puede deshacer.</Text>
          </Stack>
          <Group justify="end">
            <Button onClick={onAccept}>Aceptar</Button>
            <Button onClick={onCloseModal}>Cancelar</Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
