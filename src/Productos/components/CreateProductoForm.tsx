import { Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CreateProductoForm = ({ form }: { form: UseFormReturnType<any> }) => {
  return (
    <Group align="start">
      <Stack justify="start" align="start" gap="xs">
        <TextInput
          id="nombre"
          label="Nombre"
          placeholder="Nombre"
          key={form.key("nombre")}
          {...form.getInputProps("nombre")}
        />
        <NumberInput
          id="metroLineal"
          label="Metro Lineal"
          placeholder="Metro lineal"
          hideControls
          suffix="u"
          key={form.key("metroLineal")}
          {...form.getInputProps("metroLineal")}
        />
        <NumberInput
          label="Altura"
          placeholder="Altura"
          hideControls
          suffix="cm"
          key={form.key("altura")}
          {...form.getInputProps("altura")}
        />
        <NumberInput
          label="Ancho"
          placeholder="Ancho"
          hideControls
          suffix="cm"
          key={form.key("ancho")}
          {...form.getInputProps("ancho")}
        />
        <NumberInput
          label="Profundidad"
          placeholder="Profundidad"
          hideControls
          suffix="cm"
          key={form.key("profundidad")}
          {...form.getInputProps("profundidad")}
        />
        <NumberInput
          label="Diámetro"
          placeholder="Diámetro"
          hideControls
          suffix="cm"
          key={form.key("diametro")}
          {...form.getInputProps("diametro")}
        />
      </Stack>
      <Stack justify="start" align="start" gap="xs">
        <NumberInput
          label="Stock inicial"
          placeholder="Stock inicial"
          hideControls
          key={form.key("totales")}
          {...form.getInputProps("totales")}
        />
        <NumberInput
          label="Unidades metro lineal"
          placeholder="Unidades metro lineal"
          suffix="u"
          hideControls
          key={form.key("unidadesMetroLineal")}
          {...form.getInputProps("unidadesMetroLineal")}
        />
        <NumberInput
          label="Valor unitario garantía"
          placeholder="Valor unitario garantía"
          prefix="$"
          hideControls
          key={form.key("valorUnitarioGarantia")}
          {...form.getInputProps("valorUnitarioGarantia")}
        />
        <NumberInput
          label="Valor unitario alquiler"
          placeholder="Valor unitario alquiler"
          prefix="$"
          hideControls
          key={form.key("valorUnitarioAlquiler")}
          {...form.getInputProps("valorUnitarioAlquiler")}
        />
      </Stack>
      <Stack justify="start" align="start" gap="xs">
        <NumberInput
          label="Valor x1"
          placeholder="Valor x1"
          prefix="$"
          hideControls
          key={form.key("valorx1")}
          {...form.getInputProps("valorx1")}
        />
        <NumberInput
          label="Valor x3"
          placeholder="Valor x3"
          prefix="$"
          hideControls
          key={form.key("valorx3")}
          {...form.getInputProps("valorx3")}
        />
        <NumberInput
          label="Valor x6"
          placeholder="Valor x6"
          prefix="$"
          hideControls
          key={form.key("valorx6")}
          {...form.getInputProps("valorx6")}
        />
        <NumberInput
          label="Valor x12"
          placeholder="Valor x12"
          prefix="$"
          hideControls
          key={form.key("valorx12")}
          {...form.getInputProps("valorx12")}
        />
      </Stack>
    </Group>
  );
};
