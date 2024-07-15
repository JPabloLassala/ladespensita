import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  AlquilerDetailsContainer,
  AlquilerEntry,
  AlquilerEntryContainer,
  AlquilerNoneSelected,
} from "./UI";
import { DeleteAlquilerModal } from "./DeleteAlquilerModal";
import { AlquileresContext } from "@stores";
import { Alquiler } from "@schemas";
import { useHttp } from "@hooks";

export function Alquileres() {
  const { getSummary, alquileres, setAlquileres } = useContext(AlquileresContext)!;
  const [selectedAlquiler, setSelectedAlquiler] = useState<Alquiler>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: alquilerData } = useHttp<Alquiler>("http://127.0.0.1:3000/alquileres", {}, []);
  const handleSelectAlquiler = (id: string) => {
    setSelectedAlquiler(alquileres.find((alquiler) => alquiler.id === id));
  };
  const handleDeleteAlquiler = (id: string) => {
    console.log("Deleting alquiler", id);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    console.log("Closing modal");
  };

  useEffect(() => {
    setAlquileres(alquilerData);
  }, [alquilerData]);

  return (
    <main className="flex flex-row overflow-y-auto w-full">
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        Confirmación de borrado de alquiler
      </Modal>
      <AlquilerEntryContainer>
        {getSummary().map((alquiler) => (
          <AlquilerEntry
            key={alquiler.id}
            alquiler={alquiler}
            isSelected={selectedAlquiler?.id === alquiler.id}
            dateRange={`${dayjs(alquiler.since).format("DD/MM/YYYY")} - ${dayjs(alquiler.until).format("DD/MM/YYYY")}`}
            onSelectAlquiler={() => handleSelectAlquiler(alquiler.id)}
            onDeleteAlquiler={() => handleDeleteAlquiler(alquiler.id)}
          />
        ))}
      </AlquilerEntryContainer>
      {alquileres.length > 0 && selectedAlquiler && (
        <AlquilerDetailsContainer selectedAlquiler={selectedAlquiler} />
      )}
      {!selectedAlquiler && <AlquilerNoneSelected />}
    </main>
  );
}
