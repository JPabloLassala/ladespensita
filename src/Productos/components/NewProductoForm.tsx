import { Group, NumberInput, Stack, TextInput } from "@mantine/core";

export const NewProductoForm = () => {
  return (
    <Group align="start">
      <Stack justify="start" align="start">
        <TextInput label="Nombre" placeholder="Nombre" />
        <NumberInput label="Metro Lineal" placeholder="Metro lineal" hideControls suffix="u" />
        <NumberInput label="Altura" placeholder="Altura" hideControls suffix="cm" />
      </Stack>
      <Stack justify="start" align="start" h="100%">
        <NumberInput label="Stock" placeholder="Stock" hideControls />
        <NumberInput
          label="Valor unitario garantía"
          placeholder="Valor unitario garantía"
          prefix="$"
          hideControls
        />
        <NumberInput
          label="Valor unitario alquiler"
          placeholder="Valor unitario alquiler"
          prefix="$"
          hideControls
        />
      </Stack>
    </Group>
  );
};
