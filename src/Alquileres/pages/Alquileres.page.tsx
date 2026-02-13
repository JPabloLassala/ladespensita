import { APP_STATE, useAppStateContext } from "@/Common";
import { useProductosContext } from "@/Productos";
import { useProductoRepository } from "@/Productos/repository";
import { Group } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AlquilerDetails,
  AlquilerList,
  AlquilerNoneSelected,
  NewAlquilerDetails,
} from "../components";
import { useAlquilerProductoRepository, useAlquilerRepository } from "../repository";
import { useAlquilerContext, useAlquilerProductoContext } from "../stores";
import {
  ALQUILER_STATUS,
  AlquilerCreate,
  AlquilerProductoCreate,
  AlquilerProductoUpdate,
  AlquilerSummaryItem,
  AlquilerUpdate,
} from "../entities";

export function AlquileresPage() {
  const [firstLoad, setFirstLoad] = useState(true);
  const {
    getSummary,
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
  const { data, sendList, sendCreate, sendUpdate, sendDelete, isLoading } =
    useAlquilerRepository(alquileres);
  const { sendCreate: sendCreateAlquilerProducto, sendUpdate: sendUpdateAlquilerProducto } =
    useAlquilerProductoRepository();
  const { setAlquilerProductos } = useAlquilerProductoContext();
  const { productos, setProductos } = useProductosContext();
  const { appState, setAppState } = useAppStateContext();
  const { data: productosData, sendList: sendListProductos } = useProductoRepository([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { id: alquilerIdParam } = useParams();
  const alquilerIdFromRoute =
    alquilerIdParam && !Number.isNaN(Number(alquilerIdParam)) ? Number(alquilerIdParam) : undefined;
  const isNewRoute = /^\/alquileres\/new\/?$/.test(location.pathname);

  function handleSelectAlquiler(id: number) {
    setAppState(APP_STATE.loaded);
    handleCancelCreateNewAlquiler(false);
    setSelectedAlquiler(alquileres.find((alquiler) => alquiler.id === id));
    navigate(`/alquileres/${id}`);
  }
  function handleStartCreateNewAlquiler() {
    if (appState === APP_STATE.creating) return;

    setAppState(APP_STATE.creating);
    createEmptyAlquiler();
    setSelectedAlquiler(undefined);
    setAlquilerProductos([]);
    navigate("/alquileres/new");
  }
  function handleCancelCreateNewAlquiler(shouldNavigate = true) {
    setAppState(APP_STATE.loaded);
    setNewAlquiler(undefined);
    setSelectedAlquiler(undefined);
    if (shouldNavigate) {
      navigate("/alquileres");
    }
  }
  async function handleCreateAlquiler(a: AlquilerCreate, ap: AlquilerProductoCreate[]) {
    if (!a) return;
    setAppState(APP_STATE.loading);

    const alquilerWithId = await sendCreate(a);
    if (!alquilerWithId) {
      setAppState(APP_STATE.loaded);
      return;
    }

    await sendCreateAlquilerProducto(ap, alquilerWithId.id);
    createAlquiler(alquilerWithId);
    setSelectedAlquiler(alquilerWithId);
    setNewAlquiler(undefined);
    setAppState(APP_STATE.loaded);
    navigate(`/alquileres/${alquilerWithId.id}`);
  }
  async function handleUpdateAlquiler(
    a: AlquilerUpdate,
    ap: (AlquilerProductoCreate | AlquilerProductoUpdate)[],
  ) {
    if (!selectedAlquiler) return;
    setAppState(APP_STATE.loading);
    await sendUpdate(a);
    await sendUpdateAlquilerProducto(ap, a.id!);
    setAppState(APP_STATE.loaded);
    updateAlquiler(a.id!, a);
  }
  async function handleDeleteAlquiler(alquiler: AlquilerSummaryItem) {
    setAppState(APP_STATE.loading);

    await sendDelete(alquiler.id);
    setAlquilerProductos([]);
    deleteAlquiler(alquiler.id);
    setSelectedAlquiler(undefined);
    setAppState(APP_STATE.loaded);
    navigate("/alquileres");
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
  }, [productosData]);

  useEffect(() => {
    if (!data.length) return;
    if (!isLoading) {
      setAlquileres(data);
    }
    setFirstLoad(false);
  }, [data, firstLoad, isLoading, setAlquileres]);

  useEffect(() => {
    if (isNewRoute) {
      if (appState !== APP_STATE.creating) {
        setAppState(APP_STATE.creating);
        createEmptyAlquiler();
        setSelectedAlquiler(undefined);
        setAlquilerProductos([]);
      }
      return;
    }

    if (alquilerIdFromRoute) {
      if (selectedAlquiler?.id === alquilerIdFromRoute) return;

      const alquiler = alquileres.find((a) => a.id === alquilerIdFromRoute);
      if (alquiler) {
        setAppState(APP_STATE.loaded);
        setNewAlquiler(undefined);
        setSelectedAlquiler(alquiler);
      } else {
        setSelectedAlquiler(undefined);
      }
      return;
    }

    if (location.pathname.startsWith("/alquileres")) {
      if (selectedAlquiler || appState === APP_STATE.creating) {
        setAppState(APP_STATE.loaded);
        setNewAlquiler(undefined);
        setSelectedAlquiler(undefined);
        setAlquilerProductos([]);
      }
    }
  }, [
    alquilerIdFromRoute,
    alquileres,
    appState,
    createEmptyAlquiler,
    isNewRoute,
    location.pathname,
    setAppState,
    setAlquilerProductos,
    setNewAlquiler,
    setSelectedAlquiler,
    selectedAlquiler?.id,
  ]);

  useEffect(() => {
    if (appState === APP_STATE.creating) return;
    if (productos.length > 0 && (alquileres.length > 0 || !alquilerIdFromRoute)) {
      setAppState(APP_STATE.loaded);
    }
  }, [alquilerIdFromRoute, alquileres.length, appState, productos.length]);

  useEffect(() => {
    if (!isNewRoute) {
      setAppState(APP_STATE.loading);
    }
    sendListProductos();
    sendList();
  }, [isNewRoute, sendList, sendListProductos]);

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
