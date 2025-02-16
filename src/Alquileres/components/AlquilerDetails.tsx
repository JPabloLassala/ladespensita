import { useContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { AlquilerProductoEntity } from "@/Alquileres/entities";
import { AlquileresContext } from "../stores";
import { Flex, Title } from "@mantine/core";
import { ProductosContext } from "@/Productos";
import { useAlquilerProductoRepository } from "../repository/AlquilerProductos.repository";
import { AlquilerProductosContainer } from "./AlquilerProductosContainer";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";

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
  const { data, sendGet } = useAlquilerProductoRepository();

  useEffect(() => {
    setAlquilerProductos(data);
  }, [data]);

  useEffect(() => {
    sendGet(selectedAlquiler?.id || 0);
  }, []);

  // const fechaInicio = dayjs(selectedAlquiler?.fechaAlquiler?.inicio || "1/1/1991").format(
  //   "DD/MM/YYYY",
  // );
  // const fechaFin = dayjs(selectedAlquiler?.fechaAlquiler?.fin || "1/1/1991").format("DD/MM/YYYY");

  function handleSelectProducto(alquilerProductoId: AlquilerProductoEntity) {
    console.log(alquilerProductoId);
    setSelectedProducto(alquilerProductoId);
  }
  // function handleChange(property: string, value: string) {
  //   if (appState === APP_STATE.creating) {
  //     setNewAlquiler({ ...newAlquiler, [property]: value });
  //   }
  // }

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          minHeight: "100%",
          maxHeight: "100%",
        }}
      >
        <Title order={3}>Productos</Title>
        <Flex direction="row" gap="1rem" mih="100%" mah="100%">
          <AlquilerProductosContainer
            productos={productos}
            alquilerProductos={alquilerProductos}
            onSelectProducto={handleSelectProducto}
            onIncreaseAlquilerProducto={increaseAlquilerProducto}
            onDecreaseAlquilerProducto={decreaseAlquilerProducto}
          />
          {selectedProducto && <AlquilerProductoDetails selectedProducto={selectedProducto} />}
        </Flex>
      </div>
    </form>
  );
}
