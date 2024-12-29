import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { PartialAlquiler } from "@/Alquileres/entities";
import { APP_STATE } from "@/Common";
import { Card, Collapse, Group, Stack, Text } from "@mantine/core";

export function NewAlquilerEntry({
  onCancelCreateAlquiler,
  newAlquiler,
  appState,
}: {
  onCancelCreateAlquiler: () => void;
  newAlquiler: PartialAlquiler;
  appState: string;
}) {
  let fechaInicio = "";
  let fechaFin = "";
  if (newAlquiler.fechaAlquiler?.inicio) {
    fechaInicio = dayjs
      .tz(newAlquiler.fechaAlquiler.inicio, "America/Argentina/Buenos_Aires")
      .format("DD/MM/YYYY");
  }
  if (newAlquiler.fechaAlquiler?.fin) {
    fechaFin = dayjs
      .tz(newAlquiler.fechaAlquiler.fin, "America/Argentina/Buenos_Aires")
      .format("DD/MM/YYYY");
  }

  const dateRange = fechaInicio || fechaFin ? `${fechaInicio} - ${fechaFin}` : "";

  return (
    <Collapse in={appState === APP_STATE.creating}>
      <Card shadow="xs" padding="lg" radius="md" withBorder>
        <Card.Section withBorder py="1rem">
          <Group justify="space-between" px="1rem">
            <Text fw={700}>{newAlquiler.proyecto}</Text>
            <FontAwesomeIcon icon={faTrash} onClick={onCancelCreateAlquiler} className="p-4" />
          </Group>
        </Card.Section>
        <Card.Section p="md">
          <Stack gap="0.5rem">
            <Text>{newAlquiler.productora}</Text>
            <Text>{dateRange}</Text>
            <Text>
              Cantidad de productos: <span className="font-semibold">{0}</span>
            </Text>
          </Stack>
        </Card.Section>
      </Card>
    </Collapse>
  );
}
