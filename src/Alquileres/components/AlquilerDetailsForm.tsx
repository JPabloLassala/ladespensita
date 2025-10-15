import { Flex, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useAlquileresContext } from "../stores";

export function AlquilerDetailsForm({ form }: { form: any }) {
  const { selectedAlquiler } = useAlquileresContext();

  return (
    <Flex direction="row" gap="1rem">
      <Flex direction="column" gap="1rem">
        <TextInput
          w="15rem"
          key={form.key("proyecto")}
          label="Proyecto"
          {...form.getInputProps("proyecto")}
        />
        <TextInput
          w="15rem"
          key={form.key("productora")}
          label="Productora"
          {...form.getInputProps("productora")}
        />
      </Flex>
      <Flex direction="column" gap="1rem">
        <DatePickerInput
          w="15rem"
          label="Fecha de inicio"
          placeholder="Pick date"
          valueFormat="DD/MM/YYYY HH:mm"
          key={form.key("fechaInicio")}
          {...form.getInputProps("fechaInicio")}
        />
        <DatePickerInput
          w="15rem"
          label="Fecha de fin"
          placeholder="Pick date"
          valueFormat="DD/MM/YYYY HH:mm"
          key={form.key("fechaFin")}
          {...form.getInputProps("fechaFin")}
        />
      </Flex>
    </Flex>
  );
}
