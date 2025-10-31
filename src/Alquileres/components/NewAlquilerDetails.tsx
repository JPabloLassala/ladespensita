import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { AlquilerCreate, AlquilerEntity, AlquilerProductoCreate } from "@/Alquileres/entities";

import { Button, Group, PillGroup, Stack, Title } from "@mantine/core";
import { ProductoEntity, useProductosContext } from "@/Productos";
import { useAlquilerProductoRepository } from "../repository/AlquilerProductos.repository";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosScrollContainer } from "./UI";
import { useProductoRepository } from "@/Productos/repository";
import { useAlquilerContext } from "../stores";
import dayjs from "dayjs";

export function NewAlquilerDetails({
  onCreateAlquiler,
}: {
  onCreateAlquiler: (a: AlquilerCreate) => void;
}) {
  const { productos, setProductos } = useProductosContext();
  const {
    selectedAlquiler,
    alquilerProductos,
    setAlquilerProductoRemaining,
    alquilerProductoRemaining,
    createEmptyAlquilerProducto,
  } = useAlquilerContext();
  const [selectedProducto, setSelectedProducto] = useState<AlquilerProductoCreate | undefined>(
    undefined,
  );
  const { sendList, sendGetRemaining, stockData } = useAlquilerProductoRepository();
  const { newAlquiler, setNewAlquiler } = useAlquilerContext();
  const { data: productosData, sendList: sendProductosList } = useProductoRepository([]);

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

  function handleSelectProducto(producto: ProductoEntity) {
    const alquilerProducto =
      alquilerProductos?.find((p) => p.productoId === producto.id) ||
      createEmptyAlquilerProducto(producto);

    setSelectedProducto(alquilerProducto);
  }

  const form = useForm<AlquilerCreate>({
    initialValues: {
      productora: newAlquiler?.productora!,
      proyecto: newAlquiler?.proyecto!,
      fechaInicio: newAlquiler?.fechaInicio || new Date(),
      fechaFin: newAlquiler?.fechaFin || new Date(),
      fechaPresupuesto: newAlquiler?.fechaPresupuesto || new Date(),
      productos: [],
    },
    onValuesChange: (values) => {
      const newAlquiler = {
        ...selectedAlquiler,
        ...values,
        fechaInicio: dayjs(values.fechaInicio).toDate(),
        fechaFin: dayjs(values.fechaFin).toDate(),
      };

      setNewAlquiler(newAlquiler);
    },
  });

  useEffect(() => {
    sendList(selectedAlquiler?.id || 0);
  }, [selectedAlquiler?.id]);

  return (
    <Stack component="div" h="100%" mih="100%" id="alquiler-details-outer-flex">
      <Title order={2}>Detalle</Title>
      <form
        id="alquiler-details-form"
        style={{ height: "100%", overflowY: "auto" }}
        onSubmit={form.onSubmit(onCreateAlquiler)}
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
                    onSelectProducto={() => handleSelectProducto(producto)}
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
