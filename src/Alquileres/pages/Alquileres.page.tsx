import { useContext, useEffect, useState } from "react";
import { AlquileresContext } from "../stores";
import { APP_STATE, AppStateContext } from "@/Common";
import { Alquiler } from "../entities";
import {
  AlquilerDetailsContainer,
  AlquilerList,
  AlquilerNoneSelected,
  NewAlquilerForm,
} from "../components";
import { useHttpRepository } from "@/Common";

export function AlquileresPage() {
  const { getSummary, alquileres, setAlquileres, deleteAlquiler } = useContext(AlquileresContext)!;
  const { setAppState, appState } = useContext(AppStateContext)!;
  const [selectedAlquiler, setSelectedAlquiler] = useState<Partial<Alquiler>>();
  const isCreatingNewAlquiler = appState === APP_STATE.creating;
  const { data: alquilerData, sendDelete } = useHttpRepository<Alquiler>(
    "http://localhost:3000/alquileres",
    {},
    [],
  );

  function handleSelectAlquiler(id: string) {
    setAppState(APP_STATE.loaded);
    setSelectedAlquiler(alquileres.find((alquiler) => alquiler.id === id));
  }
  function handleDelete(id: string) {
    console.log("Deleting alquiler with id", id);
    deleteAlquiler(id);
    sendDelete(id);
  }
  function handleStartCreateNewAlquiler() {
    setAppState(APP_STATE.creating);
    setSelectedAlquiler(undefined);
  }
  function handleCancelCreateNewAlquiler() {
    setAppState(APP_STATE.loaded);
    setSelectedAlquiler(undefined);
  }

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
        onStartCreateNewAlquiler={handleStartCreateNewAlquiler}
        onCancelCreateNewAlquiler={handleCancelCreateNewAlquiler}
      />
      {selectedAlquiler && !isCreatingNewAlquiler && (
        <AlquilerDetailsContainer selectedAlquiler={selectedAlquiler} />
      )}
      {isCreatingNewAlquiler && <NewAlquilerForm />}
      {!selectedAlquiler && !isCreatingNewAlquiler && <AlquilerNoneSelected />}
    </main>
  );
}
