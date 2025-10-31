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
          key={form.key("nombre")}
          {...form.getInputProps("nombre")}
        />
        <NumberInput
          label="Altura"
          hideControls
          suffix="cm"
          key={form.key("altura")}
          {...form.getInputProps("altura")}
        />
        <NumberInput
          label="Ancho"
          hideControls
          suffix="cm"
          key={form.key("ancho")}
          {...form.getInputProps("ancho")}
        />
        <NumberInput
          label="Profundidad"
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
          label="Totales"
          placeholder="Totales"
          hideControls
          key={form.key("totales")}
          {...form.getInputProps("totales")}
        />
        <NumberInput
          label="Unidades metro lineal"
          suffix="u"
          hideControls
          key={form.key("unidadesMetroLineal")}
          {...form.getInputProps("unidadesMetroLineal")}
        />
        <NumberInput
          label="Valor unitario garantía"
          prefix="$"
          hideControls
          key={form.key("valorUnitarioGarantia")}
          {...form.getInputProps("valorUnitarioGarantia")}
        />
      </Stack>
      <Stack justify="start" align="start" gap="xs">
        <NumberInput
          label="Valor x1"
          prefix="$"
          hideControls
          key={form.key("valorx1")}
          {...form.getInputProps("valorx1")}
        />
        <NumberInput
          label="Valor x3"
          prefix="$"
          hideControls
          key={form.key("valorx3")}
          {...form.getInputProps("valorx3")}
        />
        <NumberInput
          label="Valor x6"
          prefix="$"
          hideControls
          key={form.key("valorx6")}
          {...form.getInputProps("valorx6")}
        />
        <NumberInput
          label="Valor x12"
          prefix="$"
          hideControls
          key={form.key("valorx12")}
          {...form.getInputProps("valorx12")}
        />
      </Stack>
    </Group>
  );
};
