import { useMemo, useState } from "react";
import { AlquilerListContainer, AlquilerListEntry, NewAlquilerListEntry } from "./UI";
import dayjs from "dayjs";
import { AlquilerSummaryItem } from "../entities";
import { useAlquileresContext } from "../stores";
import { Button, Group, Stack } from "@mantine/core";

export function AlquilerList({
  onSelectAlquiler,
  getSummary,
  onStartCreateNewAlquiler,
  onCancelCreateNewAlquiler,
}: {
  onSelectAlquiler: (id: number) => void;
  getSummary: () => AlquilerSummaryItem[];
  onStartCreateNewAlquiler: () => void;
  onCancelCreateNewAlquiler: () => void;
}) {
  const [, setIsModalOpen] = useState(false);
  const [, setSelectedAlquilerForDelete] = useState<AlquilerSummaryItem>();
  const { selectedAlquiler } = useAlquileresContext();

  function handleOpenConfirmation(alquiler: AlquilerSummaryItem) {
    setIsModalOpen(true);
    setSelectedAlquilerForDelete(alquiler);
  }

  const summary = useMemo(
    () =>
      getSummary().map((alquiler) => (
        <AlquilerListEntry
          key={alquiler.id}
          alquiler={alquiler}
          isSelected={selectedAlquiler?.id === alquiler.id}
          dateRange={`${dayjs(alquiler.since).format("DD/MM/YYYY")} - ${dayjs(alquiler.until).format("DD/MM/YYYY")}`}
          onSelectAlquiler={() => onSelectAlquiler(alquiler.id)}
          onDeleteAlquiler={() => handleOpenConfirmation(alquiler)}
        />
      )),
    [getSummary],
  );

  return (
    <Stack component="section" id="alquiler-sidebar" w="17.5%" miw="350px" gap="md">
      <Group w="100%" justify="center" gap="1rem" id="newAlquilerContainer">
        <Button variant="filled" onClick={onStartCreateNewAlquiler}>
          Nuevo Alquiler
        </Button>
        <Button variant="outline" onClick={onCancelCreateNewAlquiler}>
          Reset
        </Button>
      </Group>
      <div style={{ height: "100%", overflowY: "auto" }}>
        <Stack gap="0.25rem">{summary}</Stack>
      </div>
    </Stack>
  );
}
