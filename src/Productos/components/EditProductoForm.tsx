import { Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ProductoEntity } from "../entities";

export const EditProductoForm = ({
  form,
  producto,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturnType<any>;
  producto: ProductoEntity;
}) => {
  return (
    <Group align="start">
      <Stack justify="start" align="start" gap="xs">
        <TextInput
          id="nombre"
          label="Nombre"
          value={producto.nombre}
          key={form.key("nombre")}
          {...form.getInputProps("nombre")}
        />
        <NumberInput
          label="Altura"
          value={producto.medidas.altura}
          hideControls
          suffix="cm"
          key={form.key("altura")}
          {...form.getInputProps("altura")}
        />
        <NumberInput
          label="Ancho"
          value={producto.medidas.ancho}
          hideControls
          suffix="cm"
          key={form.key("ancho")}
          {...form.getInputProps("ancho")}
        />
        <NumberInput
          label="Profundidad"
          value={producto.medidas.profundidad}
          hideControls
          suffix="cm"
          key={form.key("profundidad")}
          {...form.getInputProps("profundidad")}
        />
        <NumberInput
          label="Diámetro"
          placeholder="Diámetro"
          value={producto.medidas.diametro}
          hideControls
          suffix="cm"
          key={form.key("diametro")}
          {...form.getInputProps("diametro")}
        />
      </Stack>
      <Stack justify="start" align="start" gap="xs">
        <NumberInput
          label="Stock"
          placeholder="Stock"
          value={producto.totales}
          hideControls
          key={form.key("stock")}
          {...form.getInputProps("stock")}
        />
        <NumberInput
          label="Unidades metro lineal"
          value={producto.unidadesMetroLineal}
          suffix="u"
          hideControls
          key={form.key("unidadesMetroLineal")}
          {...form.getInputProps("unidadesMetroLineal")}
        />
        <NumberInput
          label="Valor unitario garantía"
          value={producto.valor.unitarioGarantia}
          prefix="$"
          hideControls
          key={form.key("valorUnitarioGarantia")}
          {...form.getInputProps("valorUnitarioGarantia")}
        />
      </Stack>
      <Stack justify="start" align="start" gap="xs">
        <NumberInput
          label="Valor x1"
          value={producto.valor.x1}
          prefix="$"
          hideControls
          key={form.key("valorx1")}
          {...form.getInputProps("valorx1")}
        />
        <NumberInput
          label="Valor x3"
          value={producto.valor.x3}
          prefix="$"
          hideControls
          key={form.key("valorx3")}
          {...form.getInputProps("valorx3")}
        />
        <NumberInput
          label="Valor x6"
          value={producto.valor.x6}
          prefix="$"
          hideControls
          key={form.key("valorx6")}
          {...form.getInputProps("valorx6")}
        />
        <NumberInput
          label="Valor x12"
          value={producto.valor.x12}
          prefix="$"
          hideControls
          key={form.key("valorx12")}
          {...form.getInputProps("valorx12")}
        />
      </Stack>
    </Group>
  );
};
