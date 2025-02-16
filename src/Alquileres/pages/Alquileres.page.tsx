import { useContext, useEffect } from "react";
import { AlquileresContext } from "../stores";
import { APP_STATE, AppStateContext } from "@/Common";
import { Flex } from "@mantine/core";
import { ProductosContext } from "@/Productos";
import { useProductoRepository } from "@/Productos/repository";
import { useAlquilerRepository } from "../repository";
import { AlquilerDetailsContainer } from "../components/AlquilerDetailsContainer";
import { AlquilerDetails } from "../components/AlquilerDetails";
import { AlquilerList, AlquilerNoneSelected } from "../components";

export function AlquileresPage() {
  const {
    getSummary,
    alquileres,
    setAlquileres,
    deleteAlquiler,
    selectedAlquiler,
    setSelectedAlquiler,
  } = useContext(AlquileresContext)!;
  const { setAppState, appState } = useContext(AppStateContext)!;
  const { data, sendDelete, sendList } = useAlquilerRepository([]);
  const { setProductos } = useContext(ProductosContext)!;
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

  return (
    <Flex
      direction="row"
      style={{ height: "100%", maxHeight: "100%", minHeight: "100%", overflow: "hidden" }}
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
      {/* {isCreatingNewAlquiler && (
        <NewAlquilerForm newAlquiler={newAlquiler} setNewAlquiler={setNewAlquiler} />
      )} */}
      {!selectedAlquiler && !isCreatingNewAlquiler && <AlquilerNoneSelected />}
    </Flex>
  );
}
