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
import { ALQUILER_STATUS, AlquilerEntity, AlquilerSummaryItem } from "../entities";

export function AlquileresPage() {
  const {
    getSummary,
    newAlquiler,
    alquileres,
    setAlquileres,
    selectedAlquiler,
    setSelectedAlquiler,
    setNewAlquiler,
    createEmptyAlquiler,
    createAlquiler,
    updateAlquiler,
    deleteAlquiler,
  } = useAlquilerContext();
  const { data, sendList, sendCreate, sendUpdate, sendDelete } = useAlquilerRepository([]);
  const { sendCreate: sendCreateAlquilerProducto, sendUpdate: sendUpdateAlquilerProducto } =
    useAlquilerProductoRepository();
  const { alquilerProductos, setAlquilerProductos } = useAlquilerProductoContext();
  const { setProductos } = useProductosContext();
  const { appState, setAppState } = useAppStateContext();
  const { data: productosData, sendList: sendListProductos } = useProductoRepository([]);

  function handleSelectAlquiler(id: number) {
    setAppState(APP_STATE.loaded);
    handleCancelCreateNewAlquiler();
    setSelectedAlquiler(alquileres.find((alquiler) => alquiler.id === id));
  }
  function handleStartCreateNewAlquiler() {
    setAppState(APP_STATE.creating);
    setNewAlquiler(createEmptyAlquiler());
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
    await sendCreateAlquilerProducto(alquilerProductos, alquilerWithId.id);
    createAlquiler(alquilerWithId);
    setSelectedAlquiler(alquilerWithId);
    setNewAlquiler(undefined);
  }
  async function handleUpdateAlquiler() {
    if (!selectedAlquiler) return;
    setAppState(APP_STATE.loading);
    await sendUpdate(selectedAlquiler);
    await sendUpdateAlquilerProducto(alquilerProductos, selectedAlquiler.id);
    setAppState(APP_STATE.loaded);
    updateAlquiler(selectedAlquiler.id, selectedAlquiler);
  }
  async function handleDeleteAlquiler(alquiler: AlquilerSummaryItem) {
    setAppState(APP_STATE.loading);

    await sendDelete(alquiler.id);
    setAlquilerProductos([]);
    deleteAlquiler(alquiler.id);
    setSelectedAlquiler(undefined);
    setAppState(APP_STATE.loaded);
  }
  async function handleChangeStatus(id: number, status: ALQUILER_STATUS) {
    if (!selectedAlquiler) return;
    setAppState(APP_STATE.loading);
    const updatedAlquiler = { ...selectedAlquiler, status };
    await sendUpdate(updatedAlquiler);
    updateAlquiler(id, updatedAlquiler);
    setSelectedAlquiler(updatedAlquiler);
    setAppState(APP_STATE.loaded);
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
      wrap="nowrap"
    >
      <AlquilerList
        onSelectAlquiler={handleSelectAlquiler}
        getSummary={getSummary}
        onStartCreateNewAlquiler={handleStartCreateNewAlquiler}
        onCancelCreateNewAlquiler={handleCancelCreateNewAlquiler}
        onDeleteAlquiler={handleDeleteAlquiler}
      />
      {selectedAlquiler && appState !== APP_STATE.creating && (
        <AlquilerDetails
          selectedAlquiler={selectedAlquiler}
          onUpdateAlquiler={handleUpdateAlquiler}
          onChangeStatus={handleChangeStatus}
        />
      )}
      {!selectedAlquiler && appState === APP_STATE.creating && (
        <NewAlquilerDetails onCreateAlquiler={handleCreateAlquiler} />
      )}
      {!selectedAlquiler && appState !== APP_STATE.creating && <AlquilerNoneSelected />}
    </Group>
  );
}
