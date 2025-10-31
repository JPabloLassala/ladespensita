import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { AlquilerSummaryItem, AlquilerSummaryItemCreate } from "../entities";
import { useAlquilerContext } from "../stores";
import { Button, Group, Stack } from "@mantine/core";
import { APP_STATE, useAppStateContext } from "@/Common";
import { AlquilerListEntry } from "./UI";

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
  const { selectedAlquiler, newAlquiler } = useAlquilerContext();
  const { appState } = useAppStateContext();

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
          onSelectAlquiler={() => onSelectAlquiler(alquiler.id)}
          onDeleteAlquiler={() => handleOpenConfirmation(alquiler)}
        />
      )),
    [getSummary],
  );

  const newAlquilersummary: AlquilerSummaryItemCreate | undefined = newAlquiler
    ? {
        fechaInicio: newAlquiler.fechaInicio.toISOString(),
        fechaFin: newAlquiler.fechaFin.toISOString(),
        productora: newAlquiler.productora,
        proyecto: newAlquiler.proyecto,
        totalProductos: 0,
      }
    : undefined;

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
        <Stack gap="0.25rem">
          {newAlquilersummary && newAlquiler && (
            <AlquilerListEntry
              alquiler={newAlquilersummary}
              isSelected={true}
              onSelectAlquiler={() => {}}
              onDeleteAlquiler={onCancelCreateNewAlquiler}
            />
          )}
          {summary}
        </Stack>
      </div>
    </Stack>
  );
}
