import { Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

export const EditProductoForm = ({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturnType<any>;
}) => {
  return (
    <Group align="start">
      <Stack justify="start" align="start" gap="xs">
        <TextInput
          id="nombre"
          label="Nombre"
          placeholder="Nombre"
          withAsterisk
          {...form.getInputProps("nombre")}
        />
        <NumberInput
          label="Altura"
          placeholder="Altura"
          hideControls
          suffix="cm"
          {...form.getInputProps("medidasAltura")}
        />
        <NumberInput
          label="Ancho"
          placeholder="Ancho"
          hideControls
          suffix="cm"
          {...form.getInputProps("medidasAncho")}
        />
        <NumberInput
          label="Profundidad"
          placeholder="Profundidad"
          hideControls
          suffix="cm"
          {...form.getInputProps("medidasProfundidad")}
        />
        <NumberInput
          label="Diámetro"
          placeholder="Diámetro"
          hideControls
          suffix="cm"
          {...form.getInputProps("medidasDiametro")}
        />
        <NumberInput
          label="Costo producto"
          placeholder="Costo producto"
          hideControls
          suffix="cm"
          {...form.getInputProps("costoProducto")}
        />
      </Stack>
      <Stack justify="start" align="start" gap="xs">
        <NumberInput
          label="Stock inicial"
          placeholder="Stock inicial"
          hideControls
          withAsterisk
          {...form.getInputProps("totales")}
        />
        <NumberInput
          id="metroLineal"
          label="Metro Lineal"
          placeholder="Metro lineal"
          hideControls
          suffix="u"
          withAsterisk
          {...form.getInputProps("unidadesMetroLineal")}
        />
        <NumberInput
          label="Valor unitario garantía"
          placeholder="Valor unitario garantía"
          prefix="$"
          hideControls
          withAsterisk
          {...form.getInputProps("valorUnitarioGarantia")}
        />
        <NumberInput
          label="Valor unitario alquiler"
          placeholder="Valor unitario alquiler"
          prefix="$"
          hideControls
          withAsterisk
          {...form.getInputProps("valorUnitarioAlquiler")}
        />
        <NumberInput
          label="Costo gráfica"
          placeholder="Costo gráfica"
          hideControls
          suffix="cm"
          {...form.getInputProps("costoGrafica")}
        />
        <NumberInput
          label="Costo diseño"
          placeholder="Costo diseño"
          hideControls
          suffix="cm"
          {...form.getInputProps("costoDiseno")}
        />
      </Stack>
      <Stack justify="start" align="start" gap="xs">
        <NumberInput
          label="Valor x1"
          placeholder="Valor x1"
          prefix="$"
          hideControls
          withAsterisk
          {...form.getInputProps("valorX1")}
        />
        <NumberInput
          label="Valor x3"
          placeholder="Valor x3"
          prefix="$"
          hideControls
          withAsterisk
          {...form.getInputProps("valorX3")}
        />
        <NumberInput
          label="Valor x6"
          placeholder="Valor x6"
          prefix="$"
          hideControls
          withAsterisk
          {...form.getInputProps("valorX6")}
        />
        <NumberInput
          label="Valor x12"
          placeholder="Valor x12"
          prefix="$"
          hideControls
          withAsterisk
          {...form.getInputProps("valorX12")}
        />
      </Stack>
    </Group>
  );
};
