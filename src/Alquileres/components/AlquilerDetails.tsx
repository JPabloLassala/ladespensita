import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
  AlquilerUpdate,
} from "@/Alquileres/entities";
import { useAlquileresContext } from "../stores";
import { Button, Group, Stack, Title } from "@mantine/core";
import { ProductoEntity, useProductosContext } from "@/Productos";
import { useAlquilerProductoRepository } from "../repository/AlquilerProductos.repository";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosScrollContainer } from "./UI";
import { useProductoRepository } from "@/Productos/repository";

export function AlquilerDetails() {
  const { productos, setProductos } = useProductosContext();
  const {
    updateAlquiler,
    selectedAlquiler,
    alquilerProductos,
    setAlquilerProductos,
    createEmptyAlquilerProducto,
    setAlquilerProductoRemaining,
    alquilerProductoRemaining,
  } = useAlquileresContext();
  const [selectedProducto, setSelectedProducto] = useState<
    AlquilerProductoEntity | AlquilerProductoCreate | undefined
  >(undefined);
  const { data, sendList, sendGetRemaining, stockData } = useAlquilerProductoRepository();
  const { data: productosData, sendList: sendProductosList } = useProductoRepository([]);

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

  const form = useForm<AlquilerUpdate>({
    initialValues: {
      productora: selectedAlquiler?.productora || "",
      proyecto: selectedAlquiler?.proyecto || "",
      fechaInicio: selectedAlquiler?.fechaInicio || new Date(),
      fechaFin: selectedAlquiler?.fechaFin || new Date(),
      fechaPresupuesto: selectedAlquiler?.fechaPresupuesto || new Date(),
      productos: [],
    },
    onValuesChange: (values) => {
      console.log("values", values);
      // updateAlquiler(selectedAlquiler?.id || 0, { ...values });
    },
  });

  return (
    <Stack component="div" h="100%" mih="100%" id="alquiler-details-outer-flex">
      <Title order={2}>Detalle</Title>
      <form
        onSubmit={form.onSubmit((values) => console.log(values))}
        id="alquiler-details-form"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Stack component="div" mih="100%" h="100%" id="alquiler-details-inner-flex" gap="1rem">
          <AlquilerDetailsForm form={form} />
          <AlquilerProductosScrollContainer>
            {productos.map((producto) => {
              const alquilerProducto = alquilerProductos.find((p) => p.productoId === producto.id);
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
                  onSelectProducto={() => handleSelectProducto(selectedAlquiler?.id || 0, producto)}
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
      </form>
    </Stack>
  );
}
