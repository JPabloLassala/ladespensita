import { useState } from "react";
import { DeleteAlquilerModal } from "./DeleteAlquilerModal";
import { AlquilerEntry, AlquilerEntryContainer } from "./UI";
import { Alquiler, AlquilerSummaryItem } from "@schemas";
import dayjs from "dayjs";

export function AlquilerList({
  onSelectAlquiler,
  onDeleteAlquiler,
  getSummary,
  selectedAlquiler,
}: {
  onSelectAlquiler: (id: string) => void;
  onDeleteAlquiler: (id: string) => void;
  getSummary: () => AlquilerSummaryItem[];
  selectedAlquiler: Alquiler | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlquilerForDelete, setSelectedAlquilerForDelete] = useState<AlquilerSummaryItem>();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteAlquiler = (id: string) => {
    console.log("Deleting alquiler with id", id);

    handleCloseModal();
    onDeleteAlquiler(id);
  };
  const handleOpenConfirmation = (alquiler: AlquilerSummaryItem) => {
    setIsModalOpen(true);
    setSelectedAlquilerForDelete(alquiler);
  };

  return (
    <>
      {selectedAlquilerForDelete && (
        <DeleteAlquilerModal
          isModalOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          onAccept={() => handleDeleteAlquiler(selectedAlquilerForDelete.id)}
          title={selectedAlquilerForDelete.proyecto}
        />
      )}
      <AlquilerEntryContainer>
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
      </AlquilerEntryContainer>
    </>
  );
}
