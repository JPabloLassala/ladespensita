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
import { getAlquileresRepository } from "../repository";

export function AlquileresPage() {
  const { getSummary, alquileres, setAlquileres, deleteAlquiler, newAlquiler, setNewAlquiler } =
    useContext(AlquileresContext)!;
  const { setAppState, appState } = useContext(AppStateContext)!;
  const [selectedAlquiler, setSelectedAlquiler] = useState<Partial<Alquiler>>();
  const isCreatingNewAlquiler = appState === APP_STATE.creating;
  const { data: alquilerData, sendDelete } = useHttpRepository<Alquiler>(
    [],
    getAlquileresRepository(),
  );

  function handleSelectAlquiler(id: number) {
    setAppState(APP_STATE.loaded);
    setSelectedAlquiler(alquileres.find((alquiler) => alquiler.id === id));
  }
  function handleDelete(id: number) {
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
      {isCreatingNewAlquiler && (
        <NewAlquilerForm newAlquiler={newAlquiler} setNewAlquiler={setNewAlquiler} />
      )}
      {!selectedAlquiler && !isCreatingNewAlquiler && <AlquilerNoneSelected />}
    </main>
  );
}
