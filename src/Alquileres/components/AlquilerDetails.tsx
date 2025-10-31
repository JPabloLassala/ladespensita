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
import { AlquilerProductosScrollContainer } from "./UI";
import { useProductoRepository } from "@/Productos/repository";

export function AlquilerDetails() {
  const { productos, setProductos } = useProductosContext();
  const { selectedAlquiler, setAlquilerProductos, alquilerProductos, createEmptyAlquilerProducto } =
    useAlquileresContext();
  console.log("selectedalquiler", selectedAlquiler);
  const [selectedProducto, setSelectedProducto] = useState<AlquilerProductoEntity | undefined>(
    undefined,
  );
  const { data, sendList } = useAlquilerProductoRepository();
  const { data: productosData, sendList: sendProductosList } = useProductoRepository([]);

  useEffect(() => {
    setAlquilerProductos(data);
  }, [data]);

  useEffect(() => {
    sendProductosList();
  }, []);

  useEffect(() => {
    setProductos(productosData);
  }, [productosData]);

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
    <Flex direction="column" h="100%" mih="100%" id="alquiler-details-outer-flex">
      <Title order={2}>Detalle</Title>
      <form
        onSubmit={form.onSubmit((values) => console.log(values))}
        id="alquiler-details-form"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          height: "100%",
          maxHeight: "100%",
          overflowY: "auto",
        }}
      >
        <Flex direction="column" mih="100%" h="100%" id="alquiler-details-inner-flex" gap="1rem">
          <AlquilerDetailsForm />
          <AlquilerProductosScrollContainer>
            {productos.map((producto) => {
              return (
                <AlquilerProductoItem
                  key={producto.id}
                  producto={producto}
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
        </Flex>
        {selectedProducto && <AlquilerProductoDetails selectedProducto={selectedProducto} />}
      </form>
    </Flex>
  );
}
