import { useEffect } from "react";
import { useAlquilerContext } from "../stores";
import { APP_STATE, useAppStateContext } from "@/Common";
import { Group } from "@mantine/core";
import { useProductosContext } from "@/Productos";
import { useProductoRepository } from "@/Productos/repository";
import {
  AlquilerDetails,
  AlquilerList,
  AlquilerNoneSelected,
  NewAlquilerDetails,
} from "../components";
import { useAlquilerProductoRepository, useAlquilerRepository } from "../repository";

export function AlquileresPage() {
  const {
    getSummary,
    newAlquiler,
    alquileres,
    setAlquileres,
    selectedAlquiler,
    setSelectedAlquiler,
    setNewAlquiler,
    createNewAlquiler,
    setAlquilerProductoRemaining,
  } = useAlquilerContext();
  const { data, sendList, sendCreate, sendUpdate } = useAlquilerRepository([]);
  const { setProductos } = useProductosContext();
  const { isCreating, setAppState } = useAppStateContext();
  const { sendGetRemaining, stockData } = useAlquilerProductoRepository();
  const { data: productosData, sendList: sendListProductos } = useProductoRepository([]);

  useEffect(() => {
    sendGetRemaining();
  }, []);

  useEffect(() => {
    setAlquilerProductoRemaining(stockData);
  }, [stockData]);

  function handleSelectAlquiler(id: number) {
    setAppState(APP_STATE.loaded);
    setSelectedAlquiler(alquileres.find((alquiler) => alquiler.id === id));
  }
  function handleStartCreateNewAlquiler() {
    setAppState(APP_STATE.creating);
    const alquiler = createNewAlquiler();
    setNewAlquiler(alquiler);
    setSelectedAlquiler(undefined);
  }
  function handleCancelCreateNewAlquiler() {
    setAppState(APP_STATE.loaded);
    setNewAlquiler(undefined);
    setSelectedAlquiler(undefined);
  }
  async function handleCreateAlquiler() {
    if (!newAlquiler) return;
    setAppState(APP_STATE.loading);

    await sendCreate({
      ...newAlquiler,
      productos: newAlquiler.productos?.filter((ap) => ap.cantidad && ap.cantidad > 0),
    });
    setNewAlquiler(undefined);
    sendList();
  }
  async function handleUpdateAlquiler() {
    setAppState(APP_STATE.loading);
    if (!selectedAlquiler) return;

    await sendUpdate(selectedAlquiler);
    sendList();
  }

  useEffect(() => {
    setProductos(productosData);
    setAlquileres(data);
    setAppState(APP_STATE.loaded);
  }, [data, productosData]);

  useEffect(() => {
    setAppState(APP_STATE.loading);
    sendListProductos();
    sendList();
  }, []);

  return (
    <Group
      id="alquileres-page"
      h="100%"
      mah="100%"
      style={{ overflowY: "auto" }}
      align="start"
      gap="xs"
    >
      <AlquilerList
        onSelectAlquiler={handleSelectAlquiler}
        getSummary={getSummary}
        onStartCreateNewAlquiler={handleStartCreateNewAlquiler}
        onCancelCreateNewAlquiler={handleCancelCreateNewAlquiler}
      />
      {selectedAlquiler && !isCreating && (
        <AlquilerDetails onUpdateAlquiler={handleUpdateAlquiler} />
      )}
      {!selectedAlquiler && isCreating && (
        <NewAlquilerDetails onCreateAlquiler={handleCreateAlquiler} />
      )}
      {!selectedAlquiler && !isCreating && <AlquilerNoneSelected />}
    </Group>
  );
}
