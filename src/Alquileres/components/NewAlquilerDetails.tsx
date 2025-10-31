import { useState } from "react";
import { useForm } from "@mantine/form";
import { AlquilerCreate, AlquilerProductoCreate } from "@/Alquileres/entities";
import { Button, Group, Stack, Title } from "@mantine/core";
import { ProductoEntity, useProductosContext } from "@/Productos";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosScrollContainer } from "./UI";
import { useAlquilerContext } from "../stores";
import dayjs from "dayjs";

export function NewAlquilerDetails({
  onCreateAlquiler,
}: {
  onCreateAlquiler: (a: AlquilerCreate) => void;
}) {
  const { productos } = useProductosContext();
  const {
    selectedAlquiler,
    alquilerProductos,
    alquilerProductoRemaining,
    createEmptyAlquilerProducto,
  } = useAlquilerContext();
  const [selectedProducto, setSelectedProducto] = useState<AlquilerProductoCreate | undefined>(
    undefined,
  );
  const { newAlquiler, setNewAlquiler } = useAlquilerContext();

  const form = useForm<AlquilerCreate>({
    initialValues: {
      productora: newAlquiler?.productora!,
      proyecto: newAlquiler?.proyecto!,
      fechaInicio: newAlquiler?.fechaInicio || new Date(),
      fechaFin: newAlquiler?.fechaFin || new Date(),
      fechaPresupuesto: newAlquiler?.fechaPresupuesto || new Date(),
      productos: productos.reduce((acc: AlquilerProductoCreate[], producto) => {
        acc[producto.id] = createEmptyAlquilerProducto(producto);
        return acc;
      }, []),
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

  function handleSelectProducto(producto: ProductoEntity) {
    if (selectedProducto?.productoId === producto.id) return;
    const alquilerProducto =
      alquilerProductos?.find((p) => p.productoId === producto.id) ||
      createEmptyAlquilerProducto(producto);
    setSelectedProducto(alquilerProducto);
  }

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
                const apRemaining = alquilerProductoRemaining.find(
                  (p) => p.productoId === producto.id,
                ) || { productoId: producto.id, remaining: 0 };
                return (
                  <AlquilerProductoItem
                    key={producto.id}
                    producto={producto}
                    remaining={apRemaining}
                    inputProps={form.getInputProps(`productos.${producto.id}.cantidad`)}
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
