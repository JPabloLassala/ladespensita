import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DeleteAlquilerModal } from "../pages/DeleteAlquilerModal.page";
import { AlquilerEntry, AlquilerListContainer, NewAlquilerEntry } from "./UI";
import dayjs from "dayjs";
import { Alquiler, AlquilerSummaryItem } from "../entities";
import { AlquileresContext } from "../stores";
import { AppStateContext } from "@/Common";
import { Button, Center, ScrollArea, Stack } from "@mantine/core";

export function AlquilerList({
  onSelectAlquiler,
  onDeleteAlquiler,
  getSummary,
  selectedAlquiler,
  onStartCreateNewAlquiler,
  onCancelCreateNewAlquiler,
}: {
  onSelectAlquiler: (id: number) => void;
  onDeleteAlquiler: (id: number) => void;
  getSummary: () => AlquilerSummaryItem[];
  selectedAlquiler: Partial<Alquiler> | undefined;
  onStartCreateNewAlquiler: () => void;
  onCancelCreateNewAlquiler: () => void;
}) {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [size, setSize] = useState(0);
  const [selectedAlquilerForDelete, setSelectedAlquilerForDelete] = useState<AlquilerSummaryItem>();
  const { newAlquiler } = useContext(AlquileresContext)!;
  const { appState } = useContext(AppStateContext)!;
  const newAlquilerContainerHeight =
    document.getElementById("newAlquilerContainer")?.clientHeight || 0;

  useLayoutEffect(() => {
    const updateSize = () => setSize(window.innerHeight);
    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    setScrollHeight(size - newAlquilerContainerHeight - 130);
  }, [size]);

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
      </Center>
      {selectedAlquilerForDelete && (
        <DeleteAlquilerModal
          isModalOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          onAccept={() => handleDeleteAlquiler(selectedAlquilerForDelete.id)}
          title={selectedAlquilerForDelete.proyecto}
        />
      )}
      <ScrollArea
        offsetScrollbars
        type="always"
        style={{
          height: scrollHeight,
          maxHeight: scrollHeight,
        }}
      >
        <Stack gap={2}>
          <NewAlquilerEntry
            onCancelCreateAlquiler={onCancelCreateNewAlquiler}
            newAlquiler={newAlquiler}
            appState={appState}
          />
          {getSummary().map((alquiler) => (
            <AlquilerEntry
              key={alquiler.id}
              alquiler={alquiler}
              isSelected={selectedAlquiler?.id === alquiler.id}
              dateRange={`${dayjs(alquiler.since).format("DD/MM/YYYY")} - ${dayjs(alquiler.until).format("DD/MM/YYYY")}`}
              onSelectAlquiler={() => onSelectAlquiler(alquiler.id)}
              onDeleteAlquiler={() => handleOpenConfirmation(alquiler)}
            />
          ))}
        </Stack>
      </ScrollArea>
    </AlquilerListContainer>
  );
}
