import { ProductoEntity } from "@/Productos";
import { Button, Group, Image, NumberInput, Paper, Stack, Text } from "@mantine/core";
import { UseFormReturnType } from "node_modules/@mantine/form/lib/types";
import { AlquilerProductoCreate } from "../entities";
import { useForm } from "@mantine/form";

type formType = UseFormReturnType<
  { productos: Record<number, AlquilerProductoCreate> },
  (values: { productos: Record<number, AlquilerProductoCreate> }) => {
    productos: Record<number, AlquilerProductoCreate>;
  }
>;

export function AlquilerProductoItem({
  producto,
  onSelectProducto,
  isSelected,
  productosForm,
  remaining,
  tabIndex,
}: {
  producto: ProductoEntity;
  onSelectProducto: (productoId: number) => void;
  isSelected: boolean;
  productosForm: formType;
  remaining: number | string;
  tabIndex: number;
}) {
  const innerForm = useForm<{ precioFinal: number; cantidad: number; times: number }>({
    initialValues: { precioFinal: 0, cantidad: 0, times: 1 },
    onValuesChange: (values) => {
      let precioFinal;
      if (values.cantidad > 12) {
        precioFinal = values.cantidad * producto.valorX12;
      } else if (values.cantidad > 6) {
        precioFinal = values.cantidad * producto.valorX6;
      } else if (values.cantidad > 3) {
        precioFinal = values.cantidad * producto.valorX3;
      } else {
        precioFinal = values.cantidad * producto.valorX1;
      }
      productosForm.setFieldValue(`productos.${producto.id}`, {
        ...productosForm.values.productos[producto.id],
        productoId: producto.id,
        cantidad: values.cantidad,
        precioFinal,
      });
    },
  });

  function handleIncreaseQuantity() {
    const quantity = innerForm.values.cantidad;

    if (remaining !== "-" && quantity === +remaining) {
      innerForm.setFieldValue("cantidad", quantity);
      return;
    }

    innerForm.setFieldValue("cantidad", quantity + 1);
  }

  function handleDecreaseQuantity() {
    const quantity = innerForm.values.cantidad;

    if (quantity > 0) {
      innerForm.setFieldValue("cantidad", quantity - 1);
    }
  }

  return (
    <Paper
      withBorder
      shadow="xs"
      radius="md"
      p="xs"
      key={producto.id}
      onClick={() => onSelectProducto(producto.id)}
      style={{
        cursor: "pointer",
        backgroundColor: isSelected ? "#e0f7fa" : "white",
        transition: "background-color 0.3s",
      }}
    >
      <Group wrap="nowrap" justify="space-between" align="center">
        <Group wrap="nowrap">
          <Image
            src={producto.image?.url}
            fallbackSrc={`https://placehold.co/75?text=Sin%20Foto`}
            w={75}
            alt={producto.nombre}
          />
          <Stack>
            <Text fw={700}>{producto.nombre}</Text>
            <Text size="sm" color="dimmed">
              Disponible: {remaining}
            </Text>
          </Stack>
        </Group>
        <Group wrap="nowrap" align="center">
          <Button
            size="compact-md"
            variant="outline"
            onClick={handleDecreaseQuantity}
            tabIndex={-1}
          >
            -
          </Button>
          <NumberInput
            hideControls
            w="4rem"
            fw={700}
            {...innerForm.getInputProps("cantidad")}
            tabIndex={tabIndex}
            max={remaining !== "-" ? +remaining : undefined}
          />
          <Button
            size="compact-md"
            variant="outline"
            onClick={handleIncreaseQuantity}
            tabIndex={-1}
          >
            +
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}
