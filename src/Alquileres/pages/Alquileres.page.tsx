import { useEffect } from "react";
import { useAlquileresContext } from "../stores";
import { APP_STATE, useAppStateContext } from "@/Common";
import { Flex } from "@mantine/core";
import { useProductosContext } from "@/Productos";
import { useProductoRepository } from "@/Productos/repository";
import {
  AlquilerDetails,
  AlquilerDetailsContainer,
  AlquilerList,
  AlquilerNoneSelected,
  NewAlquilerForm,
} from "../components";
import { useAlquilerRepository } from "../repository";

export function AlquileresPage() {
  const {
    getSummary,
    alquileres,
    setAlquileres,
    deleteAlquiler,
    selectedAlquiler,
    setSelectedAlquiler,
  } = useAlquileresContext();
  const { setAppState, appState } = useAppStateContext();
  const { data, sendDelete, sendList } = useAlquilerRepository([]);
  const { setProductos } = useProductosContext();
  const isCreatingNewAlquiler = appState === APP_STATE.creating;
  const { data: productosData, sendList: sendListProductos } = useProductoRepository([]);

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
    setProductos(productosData);
    setAlquileres(data);
  }, [data, productosData]);

  useEffect(() => {
    sendListProductos();
    sendList();
  }, []);

  console.log("selectedAlquiler", selectedAlquiler);
  console.log("isCreatingNewAlquiler", isCreatingNewAlquiler);

  return (
    <Flex
      direction="row"
      style={{ height: "100%", maxHeight: "100%", minHeight: "100%", overflow: "hidden" }}
      gap="xs"
    >
      <AlquilerList
        onSelectAlquiler={handleSelectAlquiler}
        onDeleteAlquiler={handleDelete}
        getSummary={getSummary}
        onStartCreateNewAlquiler={handleStartCreateNewAlquiler}
        onCancelCreateNewAlquiler={handleCancelCreateNewAlquiler}
      />
      {selectedAlquiler && !isCreatingNewAlquiler && (
        <AlquilerDetailsContainer>
          <AlquilerDetails />
        </AlquilerDetailsContainer>
      )}
      {isCreatingNewAlquiler && <NewAlquilerForm />}
      {!selectedAlquiler && !isCreatingNewAlquiler && <AlquilerNoneSelected />}
    </Flex>
  );
}
