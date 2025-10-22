import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  AlquilerEntity,
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
  AlquilerUpdate,
} from "@/Alquileres/entities";

import { Button, Group, Stack, Title } from "@mantine/core";
import { ProductoEntity, useProductosContext } from "@/Productos";
import { useAlquilerProductoRepository } from "../repository/AlquilerProductos.repository";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosScrollContainer } from "./UI";
import { useProductoRepository } from "@/Productos/repository";
import { useAlquilerRepository } from "../repository";
import { useAlquilerContext } from "../stores";
import { APP_STATE, useAppStateContext } from "@/Common";

export function AlquilerDetails() {
  const { productos, setProductos } = useProductosContext();
  const {
    newAlquiler,
    updateAlquiler,
    selectedAlquiler,
    alquilerProductos,
    setAlquilerProductos,
    createEmptyAlquilerProducto,
    setAlquilerProductoRemaining,
    alquilerProductoRemaining,
  } = useAlquilerContext();
  const { appState } = useAppStateContext();
  const [selectedProducto, setSelectedProducto] = useState<
    AlquilerProductoEntity | AlquilerProductoCreate | undefined
  >(undefined);
  const { data, sendList, sendGetRemaining, stockData } = useAlquilerProductoRepository();
  const { sendCreate } = useAlquilerRepository();
  const { data: productosData, sendList: sendProductosList } = useProductoRepository([]);
  const isCreatingNew = appState === APP_STATE.creating;

  useEffect(() => {
    setAlquilerProductos(data);
  }, [data]);

  useEffect(() => {
    sendProductosList();
    sendGetRemaining();
  }, []);

  useEffect(() => {
    setProductos(productosData);
  }, [productosData]);

  useEffect(() => {
    setAlquilerProductoRemaining(stockData);
  }, [stockData]);

  useEffect(() => {
    sendList(selectedAlquiler?.id || 0);
  }, [selectedAlquiler?.id]);

  function handleSelectProducto(alquilerId: number, producto: ProductoEntity) {
    const alquilerProducto =
      alquilerProductos?.find((p) => p.productoId === producto.id) ||
      createEmptyAlquilerProducto(alquilerId, producto);

    setSelectedProducto(alquilerProducto);
  }

  const form = useForm<AlquilerEntity>({
    initialValues: {
      id: selectedAlquiler?.id || 0,
      productora: selectedAlquiler?.productora || "",
      proyecto: selectedAlquiler?.proyecto || "",
      fechaInicio: selectedAlquiler?.fechaInicio || new Date(),
      fechaFin: selectedAlquiler?.fechaFin || new Date(),
      fechaPresupuesto: selectedAlquiler?.fechaPresupuesto || new Date(),
      productos: [],
      createdAt: selectedAlquiler?.createdAt || new Date(),
    },
    onValuesChange: (values) => {
      console.log("values", values);
      // updateAlquiler(selectedAlquiler?.id || 0, { ...values });
    },
  });

  const handleSubmit = (values: AlquilerEntity) => {
    const alquiler: AlquilerEntity = {
      ...values,
      productos:
        values.productos?.filter(Boolean).map((ap) => ({
          id: ap.productoId!,
          alquilerId: selectedAlquiler?.id || 0,
          productoId: ap.productoId!,
          cantidad: ap.cantidad!,
          valorUnitarioGarantia: ap.valorUnitarioGarantia!,
          valorTotalGarantia: ap.valorTotalGarantia!,
          costoGrafica: ap.costoGrafica!,
          costoDiseno: ap.costoDiseno!,
          costoTotal: ap.costoTotal!,
          valorX1: ap.valorX1!,
          valorX3: ap.valorX3!,
          valorX6: ap.valorX6!,
          valorX12: ap.valorX12!,
          costoProducto: ap.costoProducto!,
          valorUnitarioAlquiler: ap.valorUnitarioAlquiler!,
          createdAt: ap.createdAt || new Date(),
        })) || [],
    };
    updateAlquiler(selectedAlquiler?.id || 0, alquiler);
    sendCreate(alquiler);
  };

  return (
    <Stack component="div" h="100%" mih="100%" id="alquiler-details-outer-flex">
      <Title order={2}>Detalle</Title>
      <form
        id="alquiler-details-form"
        style={{ height: "100%", overflowY: "auto" }}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Group component="div" h="100%" style={{ overflowY: "auto" }} align="flex-start" gap="md">
          <Stack component="div" mih="100%" h="100%" id="alquiler-details-inner-flex" gap="md">
            <AlquilerDetailsForm form={form} />
            <AlquilerProductosScrollContainer>
              {productos.map((producto) => {
                const alquilerProducto = alquilerProductos.find(
                  (p) => p.productoId === producto.id,
                );
                const apRemaining = alquilerProductoRemaining.find(
                  (p) => p.productoId === producto.id,
                ) || { productoId: producto.id, remaining: 0 };
                return (
                  <AlquilerProductoItem
                    key={producto.id}
                    alquilerProducto={alquilerProducto}
                    producto={producto}
                    remaining={apRemaining}
                    inputProps={form.getInputProps(`productos.${producto.id}`)}
                    onSelectProducto={() =>
                      handleSelectProducto(selectedAlquiler?.id || 0, producto)
                    }
                  />
                );
              })}
            </AlquilerProductosScrollContainer>
            <Group mb="1rem">
              <Button type="submit" color="blue" size="lg">
                Guardar
              </Button>
              <Button type="button" color="red" size="lg">
                Cancelar
              </Button>
            </Group>
          </Stack>
          {selectedProducto && (
            <AlquilerProductoDetails
              selectedProducto={selectedProducto}
              inputProps={form.getInputProps(`productos.${selectedProducto.productoId}`)}
            />
          )}
        </Group>
      </form>
    </Stack>
  );
}
