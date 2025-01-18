import { useContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { AlquilerProductoEntity } from "@/Alquileres/entities";
import { AlquileresContext } from "../stores";
import { Flex, TextInput, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { ProductosContext } from "@/Productos";
import { useAlquilerProductoRepository } from "../repository/AlquilerProductos.repository";
import { AlquilerProductosContainer } from "./UI";

export function AlquilerDetailsContainer() {
  const { productos } = useContext(ProductosContext)!;
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const { increaseAlquilerProducto, selectedAlquiler, setAlquilerProductos, alquilerProductos } =
    useContext(AlquileresContext)!;
  const [, setSelectedProducto] = useState<AlquilerProductoEntity | undefined>(undefined);
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
    <div
      style={{
        minHeight: "100%",
        maxHeight: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          minHeight: "100%",
          maxHeight: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <form
          onSubmit={form.onSubmit((values) => console.log(values))}
          style={{ display: "flex", flexDirection: "column", minHeight: "100%", maxHeight: "100%" }}
        >
          <Title order={2}>Detalle</Title>
          <Flex direction="row" gap="1rem">
            <Flex direction="column" gap="1rem">
              <TextInput w="15rem" label="Productora" />
              <TextInput w="15rem" label="Proyecto" />
            </Flex>
            <DatePickerInput
              type="range"
              label="Fecha de inicio - fin"
              placeholder="Pick date"
              value={value}
              onChange={setValue}
              w="15rem"
              valueFormat="DD/MM/YYYY"
            />
          </Flex>
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
            <AlquilerProductosContainer
              productos={productos}
              alquilerProductos={alquilerProductos}
              onSelectProducto={handleSelectProducto}
              onIncreaseAlquilerProducto={increaseAlquilerProducto}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
