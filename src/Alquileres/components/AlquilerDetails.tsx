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
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosScrollContainer } from "./UI";
import { useAlquilerContext } from "../stores";

export function AlquilerDetails({
  onUpdateAlquiler,
  selectedAlquiler,
}: {
  onUpdateAlquiler: () => void;
  selectedAlquiler: AlquilerEntity | undefined;
}) {
  const { productos } = useProductosContext();
  const {
    updateAlquiler,
    alquilerProductos,
    alquilerProductoRemaining,
    createEmptyAlquilerProducto,
  } = useAlquilerContext();
  const [selectedProducto, setSelectedProducto] = useState<
    AlquilerProductoEntity | AlquilerProductoCreate | undefined
  >(undefined);

  const form = useForm<AlquilerUpdate>({
    initialValues: {
      id: selectedAlquiler?.id || 0,
      productora: selectedAlquiler!.productora || "",
      proyecto: selectedAlquiler!.proyecto || "",
      fechaInicio: selectedAlquiler!.fechaInicio || new Date(),
      fechaFin: selectedAlquiler!.fechaFin || new Date(),
      fechaPresupuesto: selectedAlquiler!.fechaPresupuesto || new Date(),
      productos: productos.reduce((acc: AlquilerProductoUpdate[], producto) => {
        const productoInAlquiler = selectedAlquiler?.productos.find(
          (p) => p.productoId === producto.id,
        );
        if (productoInAlquiler) {
          acc[producto.id] = productoInAlquiler;
          return acc;
        }

        acc[producto.id] = createEmptyAlquilerProducto(producto, selectedAlquiler!.id);
        return acc;
      }, []),
      createdAt: selectedAlquiler!.createdAt || new Date(),
    },
    onValuesChange: (values) => {
      console.log("values", values);
      updateAlquiler(selectedAlquiler?.id || 0, {
        ...values,
        productos: (values.productos as AlquilerProductoEntity[]) || [],
      });
    },
  });

  function handleSelectProducto(alquilerId: number, producto: ProductoEntity) {
    if (selectedProducto?.productoId === producto.id) return;

    const alquilerProducto =
      alquilerProductos?.find((p) => p.productoId === producto.id) ||
      createEmptyAlquilerProducto(producto, alquilerId);
    setSelectedProducto(alquilerProducto);

    const formAlquilerProducto = form.values.productos.find(
      (p) => p.productoId === alquilerProducto.productoId,
    );
    if (!formAlquilerProducto) {
      form.setValues((cur) => {
        return {
          ...cur,
          productos: [...(cur.productos || []), alquilerProducto],
        };
      });
    }
  }

  return (
    <Stack component="div" h="100%" mih="100%" id="alquiler-details-outer-flex">
      <Title order={2}>Detalle</Title>
      <form
        id="alquiler-details-form"
        style={{ height: "100%", overflowY: "auto" }}
        onSubmit={form.onSubmit(onUpdateAlquiler)}
      >
        <Group component="div" h="100%" style={{ overflowY: "auto" }} align="flex-start" gap="md">
          <Stack component="div" mih="100%" h="100%" id="alquiler-details-inner-flex" gap="md">
            <AlquilerDetailsForm form={form} />
            <AlquilerProductosScrollContainer>
              {productos.map((producto) => {
                const apRemaining = alquilerProductoRemaining.find(
                  (p) => p.productoId === producto.id,
                ) || { productoId: producto.id, remaining: 0 };
                return (
                  <AlquilerProductoItem
                    key={producto.id}
                    producto={producto}
                    remaining={apRemaining}
                    inputProps={form.getInputProps(`productos.${producto.id}.cantidad`)}
                    onSelectProducto={() => handleSelectProducto(selectedAlquiler!.id, producto)}
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
