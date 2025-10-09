import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { AlquilerProductoEntity } from "@/Alquileres/entities";
import { useAlquileresContext } from "../stores";
import { Button, Flex, Group, Title } from "@mantine/core";
import { ProductoEntity, useProductosContext } from "@/Productos";
import { useAlquilerProductoRepository } from "../repository/AlquilerProductos.repository";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosContainer, AlquilerProductosScrollContainer } from "./UI";

export function AlquilerDetails() {
  const { productos } = useProductosContext();
  const { selectedAlquiler, setAlquilerProductos, alquilerProductos, createEmptyAlquilerProducto } =
    useAlquileresContext();
  const [selectedProducto, setSelectedProducto] = useState<AlquilerProductoEntity | undefined>(
    undefined,
  );
  const { data, sendList } = useAlquilerProductoRepository();

  useEffect(() => {
    setAlquilerProductos(data);
  }, [data]);

  useEffect(() => {
    sendList(selectedAlquiler?.id || 0);
  }, [selectedAlquiler?.id]);

  function handleSelectProducto(alquilerId: number, producto: ProductoEntity) {
    const alquilerProducto = alquilerProductos?.find((p) => p.productoId === producto.id);

    setSelectedProducto(alquilerProducto || createEmptyAlquilerProducto(alquilerId, producto));
  }

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
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
          <AlquilerDetailsForm />
          <AlquilerProductosContainer>
            <AlquilerProductosScrollContainer>
              {productos.map((producto) => {
                return (
                  <AlquilerProductoItem
                    key={producto.id}
                    producto={producto}
                    onSelectProducto={() => handleSelectProducto(selectedAlquiler!.id, producto)}
                  />
                );
              })}
            </AlquilerProductosScrollContainer>
          </AlquilerProductosContainer>
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
