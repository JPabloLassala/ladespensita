import { useContext, useEffect, useState } from "react";
import { AlquilerDetailsContainer, AlquilerNoneSelected } from "./UI";
import { AlquileresContext } from "@stores";
import { Alquiler } from "@schemas";
import { useHttpRepository } from "@hooks";
import { AlquilerList } from "./AlquilerList";

export function Alquileres() {
  const { getSummary, alquileres, setAlquileres, deleteAlquiler } = useContext(AlquileresContext)!;
  const [selectedAlquiler, setSelectedAlquiler] = useState<Alquiler>();
  const { data: alquilerData, sendDelete } = useHttpRepository<Alquiler>(
    "http://localhost:3000/alquileres",
    {},
    [],
  );
  const handleSelectAlquiler = (id: string) => {
    setSelectedAlquiler(alquileres.find((alquiler) => alquiler.id === id));
  };
  const handleDelete = (id: string) => {
    console.log("Deleting alquiler with id", id);
    deleteAlquiler(id);
    sendDelete(id);
  };

  useEffect(() => {
    setAlquileres(alquilerData);
  }, [alquilerData]);

  return (
    <main className="flex flex-row overflow-y-auto w-full">
      <AlquilerList
        onSelectAlquiler={handleSelectAlquiler}
        onDeleteAlquiler={handleDelete}
        getSummary={getSummary}
        selectedAlquiler={selectedAlquiler}
      />
      {alquileres.length > 0 && selectedAlquiler && (
        <AlquilerDetailsContainer selectedAlquiler={selectedAlquiler} />
      )}
      {!selectedAlquiler && <AlquilerNoneSelected />}
    </main>
  );
}
