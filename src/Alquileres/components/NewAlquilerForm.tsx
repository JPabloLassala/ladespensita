import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  AlquilerCreate,
  AlquilerProductoCreate,
  AlquilerProductoEntity,
} from "@/Alquileres/entities";
import { Button, Flex, Group, Title } from "@mantine/core";
import { ProductoEntity, useProductosContext } from "@/Productos";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosScrollContainer } from "./UI";
import { useAlquileresContext } from "../stores";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { produce } from "immer";

export function NewAlquilerForm() {
  const { productos } = useProductosContext();
  const { createEmptyAlquilerProducto, setSelectedAlquiler, selectedAlquiler } =
    useAlquileresContext();
  const [selectedProducto, setSelectedProducto] = useState<
    AlquilerProductoEntity | AlquilerProductoCreate | undefined
  >(undefined);

  function handleSelectProducto(producto: ProductoEntity) {
    const alquilerProducto = createEmptyAlquilerProducto(selectedAlquiler?.id || 0, producto);
    setSelectedProducto(alquilerProducto);
  }

  const form = useForm<AlquilerCreate>({
    mode: "uncontrolled",
    initialValues: {
      fechaInicio: new Date(),
      fechaFin: new Date(),
      fechaPresupuesto: new Date(),
      productora: "",
      proyecto: "",
      id: 0,
    },
    onValuesChange: (values) => {
      setSelectedAlquiler((prev) => {
        if (!prev) return prev;

        prev.productora = values.productora;
        prev.proyecto = values.proyecto;
        prev.fechaInicio = values.fechaInicio;
        prev.fechaFin = values.fechaFin;
        prev.fechaPresupuesto = values.fechaPresupuesto;

        return prev;
      });
      console.log(selectedAlquiler);
    },
  });

  return (
    <Flex direction="column">
      <Title order={2}>Detalle</Title>
      <form
        onSubmit={form.onSubmit((values) => console.log(values))}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          minHeight: "100%",
          maxHeight: "100%",
        }}
      >
        <Flex direction="column">
          <AlquilerDetailsForm form={form} />
          <AlquilerProductosScrollContainer>
            {productos.map((producto) => {
              const alquilerProducto =
                selectedAlquiler?.productos?.find((p) => p.productoId === producto.id) ||
                createEmptyAlquilerProducto(selectedAlquiler?.id || 0, producto);

              return (
                <AlquilerProductoItem
                  key={producto.id}
                  producto={producto}
                  alquilerProducto={alquilerProducto}
                  onSelectProducto={() => handleSelectProducto(producto)}
                />
              );
            })}
          </AlquilerProductosScrollContainer>
          {selectedProducto && (
            <Group mt="1rem">
              <Button type="submit" color="blue" size="lg">
                Guardar
              </Button>
              <Button type="button" color="red" size="lg">
                Cancelar
              </Button>
            </Group>
          )}
        </Flex>
        {selectedProducto && <AlquilerProductoDetails selectedProducto={selectedProducto} />}
      </form>
    </Flex>
  );
}
