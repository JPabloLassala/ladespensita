import { useContext, useEffect } from "react";
import { AlquilerDetailsContainer } from "./UI";
import { AlquileresContext } from "@stores";
import { Alquiler } from "@schemas";
import { useHttpRepository } from "@hooks";
import { AlquilerList } from "./AlquilerList";

export function Alquileres() {
  const { getSummary, alquileres, setAlquileres, deleteAlquiler } = useContext(AlquileresContext)!;
  const { data: alquilerData, sendDelete } = useHttpRepository<Alquiler>(
    "http://localhost:3000/alquileres",
    {},
    [],
  );
  const handleDelete = (id: string) => {
    deleteAlquiler(id);
    sendDelete(id);
  };

  useEffect(() => {
    setAlquileres(alquilerData);
  }, [alquilerData]);

  return (
    <main className="flex flex-row overflow-y-auto w-full">
      <AlquilerList onDeleteAlquiler={handleDelete} getSummary={getSummary} />
      {alquileres.length > 0 && <AlquilerDetailsContainer />}
    </main>
  );
}
