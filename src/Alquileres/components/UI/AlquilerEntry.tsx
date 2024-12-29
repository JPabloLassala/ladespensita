import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AlquilerSummaryItem } from "@/Alquileres/entities";
import { Card, Group, Stack, Text } from "@mantine/core";

export function AlquilerEntry({
  alquiler,
  dateRange,
  isSelected,
  onSelectAlquiler,
  onDeleteAlquiler,
}: {
  alquiler: AlquilerSummaryItem;
  dateRange: string;
  isSelected: boolean;
  onSelectAlquiler: () => void;
  onDeleteAlquiler: () => void;
}) {
  return (
    <Card
      key={alquiler.productora}
      shadow="xs"
      padding="lg"
      radius="md"
      withBorder
      w="100%"
      maw="100%"
      onClick={onSelectAlquiler}
    >
      <Card.Section color="red" withBorder py="1rem">
        <Group justify="space-between" px="1rem" wrap="nowrap">
          <Group wrap="nowrap">
            {isSelected && <FontAwesomeIcon icon={faChevronRight} />}
            <Text fw={700}>{alquiler.proyecto}</Text>
          </Group>
          <FontAwesomeIcon icon={faTrash} onClick={onDeleteAlquiler} className="p-4" />
        </Group>
      </Card.Section>
      <Card.Section p="md">
        <Stack gap="0.5rem">
          <Text>{alquiler.productora}</Text>
          <Text>{dateRange}</Text>
          <Text>
            Cantidad de productos: <span className="font-semibold">{0}</span>
          </Text>
        </Stack>
      </Card.Section>
    </Card>
  );
}
