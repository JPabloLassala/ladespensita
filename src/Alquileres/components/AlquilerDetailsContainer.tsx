import dayjs from "dayjs";
import { useContext, useState } from "react";
import { useForm } from "@mantine/form";
import { Alquiler, AlquilerProductoEntity } from "@/Alquileres/entities";
import { AlquileresContext } from "../stores";
import { APP_STATE, AppStateContext } from "@/Common";
import {
  AspectRatio,
  Button,
  Flex,
  Group,
  Image,
  Indicator,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { ProductosContext } from "@/Productos";

export function AlquilerDetailsContainer({
  selectedAlquiler,
}: {
  selectedAlquiler: Partial<Alquiler>;
}) {
  const { productos } = useContext(ProductosContext)!;
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const { newAlquiler, setNewAlquiler, increaseAlquilerProducto } = useContext(AlquileresContext)!;
  const { appState } = useContext(AppStateContext)!;
  const [selectedProducto, setSelectedProducto] = useState<AlquilerProductoEntity | undefined>(
    undefined,
  );
  const fechaInicio = dayjs(selectedAlquiler?.fechaAlquiler?.inicio || "1/1/1991").format(
    "DD/MM/YYYY",
  );
  const fechaFin = dayjs(selectedAlquiler?.fechaAlquiler?.fin || "1/1/1991").format("DD/MM/YYYY");

  function handleSelectProducto(alquilerProductoId: AlquilerProductoEntity) {
    setSelectedProducto(alquilerProductoId);
  }
  function handleChange(property: string, value: string) {
    if (appState === APP_STATE.creating) {
      setNewAlquiler({ ...newAlquiler, [property]: value });
    }
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
            <Flex direction="row" gap="1rem" mih="100%" mah="100%">
              <div
                style={{
                  width: "50%",
                  minHeight: "100%",
                  maxHeight: "100%",
                  overflow: "scroll",
                }}
              >
                <Flex direction="column" gap="0.5rem" style={{ flexShrink: 1 }}>
                  {productos.map((producto) => (
                    <Paper withBorder shadow="xs" radius="md" p="xs" key={producto.id}>
                      <Group wrap="nowrap">
                        <Indicator label="0" color="red" size="lg">
                          <AspectRatio ratio={1} maw={75}>
                            <Image
                              src="http://localhost:3000/images/21.jpg"
                              alt={producto.nombre}
                            />
                          </AspectRatio>
                        </Indicator>
                        <Text>{producto.nombre}</Text>
                        <Button
                          variant="outline"
                          onClick={() =>
                            increaseAlquilerProducto(selectedAlquiler.id || 0, producto.id)
                          }
                          color="gray"
                          size="xs"
                        >
                          -
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            increaseAlquilerProducto(selectedAlquiler.id || 0, producto.id)
                          }
                          color="gray"
                          size="xs"
                        >
                          +
                        </Button>
                      </Group>
                    </Paper>
                  ))}
                </Flex>
              </div>
              <Flex direction="column" gap="0.5rem" w="50%">
                <TextInput w="15rem" label="Cantidad" value={selectedProducto?.cantidad || 0} />
                <TextInput w="15rem" label="Garantia unitario" />
                <TextInput w="15rem" label="Garantia total" />
                <TextInput w="15rem" label="Garantia subtotal" />
                <Group mt="1rem">
                  <Button type="submit" color="blue" size="lg">
                    Guardar
                  </Button>
                  <Button type="button" color="red" size="lg">
                    Cancelar
                  </Button>
                </Group>
              </Flex>
            </Flex>
          </div>
        </form>
      </div>
    </div>
  );
}
