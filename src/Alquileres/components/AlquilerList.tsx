import { useContext, useState } from "react";
import { DeleteAlquilerModal } from "../pages/DeleteAlquilerModal.page";
import { AlquilerListContainer, AlquilerListEntry, NewAlquilerListEntry } from "./UI";
import dayjs from "dayjs";
import { AlquilerSummaryItem } from "../entities";
import { AlquileresContext } from "../stores";
import { AppStateContext } from "@/Common";
import { Button, Center, Stack } from "@mantine/core";

export function AlquilerList({
  onSelectAlquiler,
  onDeleteAlquiler,
  getSummary,
  onStartCreateNewAlquiler,
  onCancelCreateNewAlquiler,
}: {
  onSelectAlquiler: (id: number) => void;
  onDeleteAlquiler: (id: number) => void;
  getSummary: () => AlquilerSummaryItem[];
  onStartCreateNewAlquiler: () => void;
  onCancelCreateNewAlquiler: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlquilerForDelete, setSelectedAlquilerForDelete] = useState<AlquilerSummaryItem>();
  const { newAlquiler, selectedAlquiler } = useContext(AlquileresContext)!;
  const { appState } = useContext(AppStateContext)!;

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleDeleteAlquiler(id: number) {
    console.log("Deleting alquiler with id", id);

    handleCloseModal();
    onDeleteAlquiler(id);
  }

  function handleOpenConfirmation(alquiler: AlquilerSummaryItem) {
    setIsModalOpen(true);
    setSelectedAlquilerForDelete(alquiler);
  }

  return (
    <AlquilerListContainer>
      <Center id="newAlquilerContainer">
        <Button variant="filled" onClick={onStartCreateNewAlquiler}>
          Nuevo Alquiler
        </Button>
        <Button variant="outline" onClick={() => onSelectAlquiler(0)}>
          Reset
        </Button>
      </Center>
      {selectedAlquilerForDelete && (
        <DeleteAlquilerModal
          isModalOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          onAccept={() => handleDeleteAlquiler(selectedAlquilerForDelete.id)}
          title={selectedAlquilerForDelete.proyecto}
        />
      )}
      <div style={{ height: "100%", overflow: "scroll" }}>
        <Stack gap="0.25rem">
          <NewAlquilerListEntry
            onCancelCreateAlquiler={onCancelCreateNewAlquiler}
            newAlquiler={newAlquiler}
            appState={appState}
          />
          {getSummary().map((alquiler) => (
            <AlquilerListEntry
              key={alquiler.id}
              alquiler={alquiler}
              isSelected={selectedAlquiler?.id === alquiler.id}
              dateRange={`${dayjs(alquiler.since).format("DD/MM/YYYY")} - ${dayjs(alquiler.until).format("DD/MM/YYYY")}`}
              onSelectAlquiler={() => onSelectAlquiler(alquiler.id)}
              onDeleteAlquiler={() => handleOpenConfirmation(alquiler)}
            />
          ))}
        </Stack>
      </div>
    </AlquilerListContainer>
  );
}
