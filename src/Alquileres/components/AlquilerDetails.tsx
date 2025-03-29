import { useContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { AlquilerProductoEntity } from "@/Alquileres/entities";
import { AlquileresContext } from "../stores";
import { Flex, Title } from "@mantine/core";
import { ProductosContext } from "@/Productos";
import { useAlquilerProductoRepository } from "../repository/AlquilerProductos.repository";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosContainer, AlquilerProductosScrollContainer } from "./UI";

export function AlquilerDetails() {
  const { productos } = useContext(ProductosContext)!;
  const {
    increaseAlquilerProducto,
    decreaseAlquilerProducto,
    changeAlquilerProductoQuantity,
    selectedAlquiler,
    setAlquilerProductos,
    alquilerProductos,
    createEmptyAlquilerProducto,
  } = useContext(AlquileresContext)!;
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

  function handleSelectProducto(productoId: number) {
    const alquilerProducto = alquilerProductos?.find((p) => p.productoId === productoId);

    setSelectedProducto(alquilerProducto || createEmptyAlquilerProducto(productoId, {}));
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
                const alquilerProducto = alquilerProductos?.find(
                  (p) => p.productoId === producto.id,
                );
                return (
                  <AlquilerProductoItem
                    key={producto.id}
                    producto={producto}
                    alquilerProducto={alquilerProducto}
                    onSelectProducto={() => handleSelectProducto(producto.id)}
                    onIncreaseAlquilerProducto={() =>
                      increaseAlquilerProducto(selectedAlquiler!.id!, producto.id)
                    }
                    onDecreaseAlquilerProducto={() =>
                      decreaseAlquilerProducto(selectedAlquiler!.id!, producto.id)
                    }
                    onChangeAlquilerProductoQuantity={(quantity) =>
                      changeAlquilerProductoQuantity(selectedAlquiler!.id!, producto.id, quantity)
                    }
                  />
                );
              })}
            </AlquilerProductosScrollContainer>
          </AlquilerProductosContainer>
        </Flex>
        {selectedProducto && <AlquilerProductoDetails selectedProducto={selectedProducto} />}
      </form>
    </Flex>
  );
}
