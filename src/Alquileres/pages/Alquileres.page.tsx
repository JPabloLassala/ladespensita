import { APP_STATE, useAppStateContext } from "@/Common";
import { useProductosContext } from "@/Productos";
import { useProductoRepository } from "@/Productos/repository";
import { Group } from "@mantine/core";
import { useEffect } from "react";
import {
  AlquilerDetails,
  AlquilerList,
  AlquilerNoneSelected,
  NewAlquilerDetails,
} from "../components";
import { useAlquilerProductoRepository, useAlquilerRepository } from "../repository";
import { useAlquilerContext, useAlquilerProductoContext } from "../stores";
import { AlquilerEntity } from "../entities";

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
  } = useAlquilerContext();
  const { data, sendList, sendCreate, sendUpdate } = useAlquilerRepository([]);
  const { sendCreate: sendCreateAlquilerProducto } = useAlquilerProductoRepository();
  const { alquilerProductos, setAlquilerProductos } = useAlquilerProductoContext();
  const { setProductos } = useProductosContext();
  const { isCreating, setAppState } = useAppStateContext();
  const { data: productosData, sendList: sendListProductos } = useProductoRepository([]);

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

    const alquilerWithId = (await sendCreate(newAlquiler)) as AlquilerEntity;
    console.log("alquilerWithId", alquilerWithId);
    await sendCreateAlquilerProducto(alquilerProductos, alquilerWithId.id);

    setAlquilerProductos([]);
    setNewAlquiler(undefined);
    setSelectedAlquiler(undefined);
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
        <AlquilerDetails
          selectedAlquiler={selectedAlquiler}
          onUpdateAlquiler={handleUpdateAlquiler}
        />
      )}
      {!selectedAlquiler && isCreating && (
        <NewAlquilerDetails onCreateAlquiler={handleCreateAlquiler} />
      )}
      {!selectedAlquiler && !isCreating && <AlquilerNoneSelected />}
    </Group>
  );
}
