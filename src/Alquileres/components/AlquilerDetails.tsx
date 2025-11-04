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

import { Button, Group, Stack, Title } from "@mantine/core";
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
  const productosForm = useForm<{ productos: (AlquilerProductoUpdate | AlquilerProductoCreate)[] }>(
    {
      initialValues: {
        productos: productos.map((p) => {
          const existing = data.find((ap) => ap.productoId === p.id);
          return existing || createEmptyAlquilerProducto(p);
        }),
      },
      onValuesChange: (values) => {
        setAlquilerProductos(values.productos);
      },
    },
  );

  useEffect(() => {
    if (!datesTouched.inicio || !datesTouched.fin) return;

    const since = dayjs(selectedAlquiler.fechaInicio).toDate();
    const until = dayjs(selectedAlquiler.fechaFin).toDate();
    if (!since || !until) return;

    sendGetStock(since, until, selectedAlquiler.id);
    setDatesTouched({ inicio: false, fin: false });
  }, [datesTouched]);

  useEffect(() => {
    form.setValues({ ...selectedAlquiler });
    const since = dayjs(selectedAlquiler.fechaInicio).toDate();
    const until = dayjs(selectedAlquiler.fechaFin).toDate();

    if (since && until) {
      sendGetStock(since, until, selectedAlquiler.id);
    }
    sendList(selectedAlquiler.id);
  }, [selectedAlquiler.id]);

  useEffect(() => {
    setAlquilerProductos(
      productos.map((p) => {
        const existing = data.find((ap) => ap.productoId === p.id);
        return existing || createEmptyAlquilerProducto(p);
      }),
    );
    productosForm.setValues({
      productos: productos.map((p) => {
        const existing = data.find((ap) => ap.productoId === p.id);
        return existing || createEmptyAlquilerProducto(p);
      }),
    });
  }, [data]);

  function handleSelectProducto(producto: ProductoEntity) {
    if (selectedProducto?.productoId === producto.id) return;

    const alquilerProducto = alquilerProductos?.find((p) => p.productoId === producto.id);

    setSelectedProducto(alquilerProducto);
  }

  const selectedProductoIdx = productosForm.values.productos.findIndex(
    (p) => p.productoId === selectedProducto?.productoId,
  );

  return (
    <Stack component="section" h="100%" mih="100%" id="alquiler-details-outer-flex">
      <Title order={2}>Detalle</Title>
      <AlquilerStatus alquiler={selectedAlquiler} onChangeStatus={onChangeStatus} />
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
            <AlquilerDetailsForm form={form} setDatesTouched={setDatesTouched} />
            <AlquilerProductosScrollContainer>
              {productos.map((producto) => {
                const apFormIdx = productosForm.values.productos.findIndex(
                  (p) => p.productoId === producto.id,
                );
                const remaining =
                  stockData?.find((s) => s.productoId === producto.id)?.remaining || "-";
                return (
                  <AlquilerProductoItem
                    key={producto.id}
                    producto={producto}
                    isSelected={selectedProducto?.productoId === producto.id}
                    inputProps={productosForm.getInputProps(`productos.${apFormIdx}.cantidad`)}
                    onSelectProducto={() => handleSelectProducto(producto)}
                    remaining={remaining}
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
            <AlquilerProductoDetails productoIdx={selectedProductoIdx} form={productosForm} />
          )}
        </Group>
      </form>
    </Stack>
  );
}
