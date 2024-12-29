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
import { Flex } from "@mantine/core";

export function AlquileresPage() {
  const { getSummary, alquileres, setAlquileres, deleteAlquiler, newAlquiler, setNewAlquiler } =
    useContext(AlquileresContext)!;
  const { setAppState, appState } = useContext(AppStateContext)!;
  const [selectedAlquiler, setSelectedAlquiler] = useState<Partial<Alquiler>>();
  const isCreatingNewAlquiler = appState === APP_STATE.creating;
  const { data, sendDelete, sendList } = useHttpRepository<Alquiler>([], getAlquileresRepository());

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
    console.log("setting productos");
    setAlquileres(data);
  }, [data]);

  useEffect(() => {
    console.log("sending list");
    sendList();
  }, []);

  return (
    <Flex
      direction="row"
      style={{ height: "100%", maxHeight: "100%", minHeight: "100%", overflow: "hidden" }}
    >
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
    </Flex>
  );
}
