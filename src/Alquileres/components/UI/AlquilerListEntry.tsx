import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  ALQUILER_STATUS,
  AlquilerSummaryItem,
  AlquilerSummaryItemCreate,
} from "@/Alquileres/entities";
import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import { DeleteAlquilerModal } from "@/Alquileres/pages";
import { useState } from "react";
import dayjs from "dayjs";

export function AlquilerListEntry({
  alquiler,
  isSelected,
  onSelectAlquiler,
  onDeleteAlquiler,
}: {
  alquiler: AlquilerSummaryItem | AlquilerSummaryItemCreate;
  isSelected: boolean;
  onSelectAlquiler: () => void;
  onDeleteAlquiler: (a: AlquilerSummaryItem) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dateRange = `${dayjs(alquiler.fechaInicio).format("DD/MM/YYYY")} - ${dayjs(alquiler.fechaFin).format("DD/MM/YYYY")}`;
  const getBadgeColor = () => {
    switch (alquiler.status) {
      case ALQUILER_STATUS.PENDING:
        return "gray";
      case ALQUILER_STATUS.BUDGETED:
        return "orange";
      case ALQUILER_STATUS.ACTIVE:
        return "blue";
      case ALQUILER_STATUS.COMPLETED:
        return "green";
      case ALQUILER_STATUS.CANCELLED:
        return "red";
    }
  };

  return (
    <Card
      key={alquiler.productora}
      shadow="xs"
      padding="lg"
      radius="md"
      mx="0.5rem"
      withBorder
      onClick={onSelectAlquiler}
      style={{
        cursor: "pointer",
        backgroundColor: isSelected ? "#e0f7fa" : "white",
        transition: "background-color 0.3s",
      }}
    >
      <Card.Section withBorder py="1rem">
        <Group justify="space-between" px="1rem" wrap="nowrap">
          <Text fw={700}>{alquiler.proyecto}</Text>
          <DeleteAlquilerModal
            onAccept={() => onDeleteAlquiler(alquiler as AlquilerSummaryItem)}
            isModalOpen={isModalOpen}
            onCloseModal={() => setIsModalOpen(false)}
          >
            <FontAwesomeIcon icon={faTrash} onClick={() => setIsModalOpen(true)} className="p-4" />
          </DeleteAlquilerModal>
        </Group>
      </Card.Section>
      <Card.Section p="md">
        <Stack gap="0.5rem">
          <Text>{alquiler.productora}</Text>
          <Text>{dateRange}</Text>
          <Badge color={getBadgeColor()} variant="outline">
            {alquiler.status}
          </Badge>
        </Stack>
      </Card.Section>
    </Card>
  );
}
