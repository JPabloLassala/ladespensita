import { useMemo } from "react";
import { AlquilerSummaryItem, AlquilerSummaryItemCreate } from "../entities";
import { useAlquilerContext } from "../stores";
import { Button, Group, Stack } from "@mantine/core";
import { AlquilerListEntry, NewAlquilerListEntry } from "./UI";

export function AlquilerList({
  onSelectAlquiler,
  getSummary,
  onStartCreateNewAlquiler,
  onCancelCreateNewAlquiler,
  onDeleteAlquiler,
}: {
  onSelectAlquiler: (id: number) => void;
  getSummary: () => AlquilerSummaryItem[];
  onStartCreateNewAlquiler: () => void;
  onCancelCreateNewAlquiler: () => void;
  onDeleteAlquiler: (a: AlquilerSummaryItem) => void;
}) {
  const { selectedAlquiler, newAlquiler } = useAlquilerContext();

  function handleDeleteAlquiler(alquiler: AlquilerSummaryItem) {
    onDeleteAlquiler(alquiler);
  }

  const summary = useMemo(
    () =>
      getSummary().map((alquiler) => (
        <AlquilerListEntry
          key={alquiler.id}
          alquiler={alquiler}
          isSelected={selectedAlquiler?.id === alquiler.id}
          onSelectAlquiler={() => onSelectAlquiler(alquiler.id)}
          onDeleteAlquiler={() => handleDeleteAlquiler(alquiler)}
        />
      )),
    [getSummary],
  );

  const newAlquilersummary: AlquilerSummaryItemCreate | undefined = newAlquiler
    ? {
        productora: newAlquiler.productora,
        proyecto: newAlquiler.proyecto,
        status: newAlquiler.status,
        fechaInicio: newAlquiler.fechaInicio.toISOString(),
        fechaFin: newAlquiler.fechaFin.toISOString(),
        totalProductos: 0,
      }
    : undefined;

  return (
    <Stack
      component="section"
      id="alquiler-sidebar"
      w="20%"
      miw="350px"
      gap="md"
      h="100%"
      style={{ overflowY: "auto" }}
    >
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
            <NewAlquilerListEntry onDeleteAlquiler={onCancelCreateNewAlquiler} />
          )}
          {summary}
        </Stack>
      </div>
    </Stack>
  );
}
