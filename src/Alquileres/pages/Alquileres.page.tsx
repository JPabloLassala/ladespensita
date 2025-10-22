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
} from "../components";
import { useAlquilerRepository } from "../repository";

export function AlquileresPage() {
  const {
    getSummary,
    alquileres,
    setAlquileres,
    selectedAlquiler,
    setSelectedAlquiler,
    createNewAlquiler,
    deleteNewAlquiler,
  } = useAlquileresContext();
  const { setAppState } = useAppStateContext();
  const { data, sendList } = useAlquilerRepository([]);
  const { setProductos } = useProductosContext();
  const { data: productosData, sendList: sendListProductos } = useProductoRepository([]);

  function handleSelectAlquiler(id: number) {
    setAppState(APP_STATE.loaded);
    setSelectedAlquiler(alquileres.find((alquiler) => alquiler.id === id));
  }
  function handleStartCreateNewAlquiler() {
    setAppState(APP_STATE.creating);
    const alquiler = createNewAlquiler();
    setSelectedAlquiler(alquiler);
  }
  function handleCancelCreateNewAlquiler() {
    setAppState(APP_STATE.loaded);
    deleteNewAlquiler();
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
    <Stack id="alquileres-page" h="100%" mah="100%" style={{ overflowY: "auto" }} gap="xs">
      <AlquilerList
        onSelectAlquiler={handleSelectAlquiler}
        getSummary={getSummary}
        onStartCreateNewAlquiler={handleStartCreateNewAlquiler}
        onCancelCreateNewAlquiler={handleCancelCreateNewAlquiler}
      />
      {selectedAlquiler && (
        <AlquilerDetailsContainer>
          <AlquilerDetails />
        </AlquilerDetailsContainer>
      )}
      {!selectedAlquiler && <AlquilerNoneSelected />}
    </Stack>
  );
}
