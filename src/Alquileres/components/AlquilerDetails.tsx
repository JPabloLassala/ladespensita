import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  ALQUILER_STATUS,
  AlquilerEntity,
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
  AlquilerUpdate,
} from "@/Alquileres/entities";

import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import { ProductoEntity, useProductosContext } from "@/Productos";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosScrollContainer } from "./UI";
import { useAlquilerContext, useAlquilerProductoContext } from "../stores";
import { useAlquilerProductoRepository } from "../repository";
import { AlquilerStatus } from "./AlquilerStatus";
import { APP_STATE, useAppStateContext } from "@/Common";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

export function AlquilerDetails({
  onUpdateAlquiler,
  onChangeStatus,
  selectedAlquiler,
}: {
  onUpdateAlquiler: () => void;
  onChangeStatus: (id: number, status: ALQUILER_STATUS) => void;
  selectedAlquiler: AlquilerEntity;
}) {
  const { appState } = useAppStateContext();
  const { productos } = useProductosContext();
  const { updateAlquiler, setSelectedAlquiler } = useAlquilerContext();
  const { alquilerProductos, createEmptyAlquilerProducto, setAlquilerProductos } =
    useAlquilerProductoContext();
  const { sendGetStock, stockData, sendList, data } = useAlquilerProductoRepository();
  const [nameFilter, setNameFilter] = useState("");
  const [selectedProducto, setSelectedProducto] = useState<
    AlquilerProductoEntity | AlquilerProductoCreate | undefined
  >(undefined);
  const [datesTouched, setDatesTouched] = useState<{ inicio: boolean; fin: boolean }>({
    inicio: false,
    fin: false,
  });

  const form = useForm<
    Omit<AlquilerUpdate, "fechaFin" | "fechaInicio"> & { fechas: (Date | null)[] }
  >({
    initialValues: {
      id: selectedAlquiler?.id || 0,
      productora: selectedAlquiler!.productora || "",
      proyecto: selectedAlquiler!.proyecto || "",
      fechas: [
        selectedAlquiler!.fechaInicio || new Date(),
        selectedAlquiler!.fechaFin || new Date(),
      ],
      fechaPresupuesto: selectedAlquiler!.fechaPresupuesto || new Date(),
      createdAt: selectedAlquiler!.createdAt || new Date(),
    },
    onValuesChange: (values) => {
      const newValues = {
        ...selectedAlquiler,
        ...values,
        fechaInicio: values.fechas[0] || undefined,
        fechaFin: values.fechas[1] || undefined,
      };

      setSelectedAlquiler(newValues as AlquilerEntity);
      updateAlquiler(selectedAlquiler.id, values);
    },
  });
  const productosForm = useForm<{
    productos: Record<number, AlquilerProductoUpdate | AlquilerProductoCreate>;
  }>({
    initialValues: {
      productos: data.reduce(
        (acc, curr) => {
          acc[curr.productoId] = curr;
          return acc;
        },
        {} as Record<number, AlquilerProductoUpdate | AlquilerProductoCreate>,
      ),
    },
    onValuesChange: (values) => {
      console.log("formValues", values);
      setAlquilerProductos((prev) => {
        return prev.map((ap) => {
          const updated = values.productos[ap.productoId];
          return updated ? { ...ap, ...updated } : ap;
        });
      });
    },
  });

  useEffect(() => {
    if (!datesTouched.inicio || !datesTouched.fin) return;
    console.log("datestouched");

    const since = dayjs(selectedAlquiler.fechaInicio).toDate();
    const until = dayjs(selectedAlquiler.fechaFin).toDate();
    if (!since || !until) return;

    sendGetStock(since, until, selectedAlquiler.id);
    setDatesTouched({ inicio: false, fin: false });
  }, [datesTouched]);

  useEffect(() => {
    console.log("selectedalquiler");
    form.setValues({ ...selectedAlquiler });
    const since = dayjs(selectedAlquiler.fechaInicio).toDate();
    const until = dayjs(selectedAlquiler.fechaFin).toDate();

    if (since && until) {
      sendGetStock(since, until, selectedAlquiler.id);
    }
    sendList(selectedAlquiler.id);
  }, [selectedAlquiler.id]);

  useEffect(() => {
    console.log("data");
    setAlquilerProductos(
      productos.map((p) => {
        const existing = data.find((ap) => ap.productoId === p.id);
        return existing || createEmptyAlquilerProducto(p);
      }),
    );
    productosForm.setValues({
      productos: data.reduce(
        (acc, curr) => {
          acc[curr.productoId] = curr;
          return acc;
        },
        {} as Record<number, AlquilerProductoUpdate | AlquilerProductoCreate>,
      ),
    });
  }, [data]);

  function handleSelectProducto(producto: ProductoEntity) {
    if (selectedProducto?.productoId === producto.id) return;

    const alquilerProducto = alquilerProductos?.find((p) => p.productoId === producto.id);

    setSelectedProducto(alquilerProducto);
  }

  const filteredProductos = productos.filter((producto) => {
    if (nameFilter === "") return true;
    return producto.nombre.toLowerCase().includes(nameFilter.toLowerCase());
  });

  return (
    <Stack component="section" h="100%" mih="100%" id="alquiler-details-outer-flex">
      <Title order={2}>Detalle</Title>
      <form
        id="alquiler-details-form"
        style={{ height: "100%", overflowY: "auto" }}
        onSubmit={form.onSubmit(onUpdateAlquiler)}
      >
        <Group
          component="div"
          h="100%"
          style={{ overflowY: "auto" }}
          align="flex-start"
          gap="md"
          wrap="nowrap"
        >
          <Stack
            component="div"
            mih="100%"
            h="100%"
            id="alquiler-details-inner-flex"
            align="center"
            gap="md"
          >
            <AlquilerStatus alquiler={selectedAlquiler} onChangeStatus={onChangeStatus} />

            <AlquilerDetailsForm form={form} setDatesTouched={setDatesTouched} />
            <TextInput
              onChange={(event) => setNameFilter(event.currentTarget.value)}
              value={nameFilter}
              placeholder="Buscar producto..."
              radius="md"
              w="100%"
              rightSection={<FontAwesomeIcon icon={faClose} onClick={() => setNameFilter("")} />}
              leftSection={<FontAwesomeIcon icon={faSearch} />}
            />
            <AlquilerProductosScrollContainer>
              {filteredProductos.map((producto, index) => {
                const remaining =
                  stockData?.find((s) => s.productoId === producto.id)?.remaining || "-";
                const alquilerProducto = alquilerProductos.find(
                  (ap) => ap.productoId === producto.id,
                );
                return (
                  <AlquilerProductoItem
                    key={producto.id}
                    producto={producto}
                    alquilerProducto={alquilerProducto}
                    isSelected={selectedProducto?.productoId === producto.id}
                    productosForm={productosForm}
                    onSelectProducto={() => handleSelectProducto(producto)}
                    remaining={remaining}
                    tabIndex={index + 3}
                  />
                );
              })}
            </AlquilerProductosScrollContainer>
            <Group mb="1rem">
              <Button
                disabled={appState === APP_STATE.loading}
                type="submit"
                color="blue"
                size="lg"
              >
                {appState === APP_STATE.loading ? "Guardando..." : "Guardar"}
              </Button>
              <Button disabled={appState === APP_STATE.loading} type="button" color="red" size="lg">
                Cancelar
              </Button>
            </Group>
          </Stack>
          {selectedProducto && (
            <AlquilerProductoDetails form={productosForm} selected={selectedProducto} />
          )}
        </Group>
      </form>
    </Stack>
  );
}
