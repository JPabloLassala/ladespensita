import { useContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { AlquilerProductoEntity } from "@/Alquileres/entities";
import { AlquileresContext } from "../stores";
import { Title } from "@mantine/core";
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
    selectedAlquiler,
    setAlquilerProductos,
    alquilerProductos,
  } = useContext(AlquileresContext)!;
  const [selectedProducto, setSelectedProducto] = useState<AlquilerProductoEntity | undefined>(
    undefined,
  );
  const { data, sendList } = useAlquilerProductoRepository();

  useEffect(() => {
    console.log(data);
    setAlquilerProductos(data);
  }, [data]);

  useEffect(() => {
    sendList(selectedAlquiler?.id || 0);
  }, [selectedAlquiler?.id]);

  function handleSelectProducto(alquilerProductoId: AlquilerProductoEntity) {
    console.log(alquilerProductoId);
    setSelectedProducto(alquilerProductoId);
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
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      style={{ display: "flex", flexDirection: "column", minHeight: "100%", maxHeight: "100%" }}
    >
      <Title order={2}>Detalle</Title>
      <AlquilerDetailsForm />
      <AlquilerProductosContainer>
        <AlquilerProductosScrollContainer>
          {productos.map((producto) => {
            const productoInAlquiler = alquilerProductos?.find((p) => p.productoId === producto.id);
            return (
              <AlquilerProductoItem
                key={producto.id}
                producto={producto}
                quantity={productoInAlquiler?.cantidad || 0}
                productoInAlquiler={productoInAlquiler}
                onSelectProducto={() => handleSelectProducto(productoInAlquiler!)}
                onIncreaseAlquilerProducto={increaseAlquilerProducto}
                onDecreaseAlquilerProducto={decreaseAlquilerProducto}
                selectedAlquiler={selectedAlquiler}
              />
            );
          })}
        </AlquilerProductosScrollContainer>
      </AlquilerProductosContainer>

      {selectedProducto && <AlquilerProductoDetails selectedProducto={selectedProducto} />}
    </form>
  );
}
