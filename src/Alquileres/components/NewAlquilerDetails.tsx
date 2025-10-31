import {
  AlquilerCreate,
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
} from "@/Alquileres/entities";
import { ProductoEntity, useProductosContext } from "@/Productos";
import { Button, Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAlquilerContext, useAlquilerProductoContext } from "../stores";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosScrollContainer } from "./UI";

export function NewAlquilerDetails({
  onCreateAlquiler,
}: {
  onCreateAlquiler: (a: AlquilerCreate) => void;
}) {
  const { productos } = useProductosContext();
  const { newAlquiler, setNewAlquiler } = useAlquilerContext();
  const { selectedAlquiler } = useAlquilerContext();
  const { createEmptyAlquilerProducto, alquilerProductos, setAlquilerProductos } =
    useAlquilerProductoContext();
  const [selectedProducto, setSelectedProducto] = useState<
    AlquilerProductoCreate | AlquilerProductoUpdate | AlquilerProductoEntity | undefined
  >(undefined);

  useEffect(() => {
    setAlquilerProductos(productos.map((producto) => createEmptyAlquilerProducto(producto)));
  }, [productos]);

  const form = useForm<AlquilerCreate>({
    initialValues: {
      productora: newAlquiler?.productora!,
      proyecto: newAlquiler?.proyecto!,
      fechaInicio: newAlquiler?.fechaInicio || new Date(),
      fechaFin: newAlquiler?.fechaFin || new Date(),
      fechaPresupuesto: newAlquiler?.fechaPresupuesto || new Date(),
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
  const productosForm = useForm<{ productos: (AlquilerProductoUpdate | AlquilerProductoCreate)[] }>(
    {
      initialValues: { productos: productos.map((p) => createEmptyAlquilerProducto(p)) },
      onValuesChange: (values) => {
        setAlquilerProductos(values.productos);
      },
    },
  );

  function handleSelectProducto(producto: ProductoEntity) {
    if (selectedProducto?.productoId === producto.id) return;
    const alquilerProducto =
      alquilerProductos?.find((p) => p.productoId === producto.id) ||
      createEmptyAlquilerProducto(producto);
    setSelectedProducto(alquilerProducto);
  }

  const selectedProductoIdx = productosForm.values.productos.findIndex(
    (p) => p.productoId === selectedProducto?.productoId,
  );

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
                const apFormIdx = productosForm.values.productos.findIndex(
                  (p) => p.productoId === producto.id,
                );
                return (
                  <AlquilerProductoItem
                    key={producto.id}
                    producto={producto}
                    inputProps={productosForm.getInputProps(`productos.${apFormIdx}.cantidad`)}
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
              inputProps={productosForm.getInputProps(`productos.${selectedProductoIdx}`)}
            />
          )}
        </Group>
      </form>
    </Stack>
  );
}
