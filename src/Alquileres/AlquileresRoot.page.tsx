import { Outlet } from "react-router-dom";
import { AlquilerList } from "./AlquilerList";
import { useContext, useEffect } from "react";
import { AlquileresContext } from "@stores";
import { useHttpRepository } from "@hooks";
import { Alquiler } from "@schemas";

export function AlquileresRoot() {
  const { getSummary, setAlquileres, deleteAlquiler } = useContext(AlquileresContext)!;
  const { data: alquilerData, sendDelete } = useHttpRepository<Alquiler>(
    "http://localhost:3000/alquileres",
    {},
    [],
  );

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
      <AlquilerList onDeleteAlquiler={handleDelete} getSummary={getSummary} />
      <Outlet />
    </main>
  );
}
