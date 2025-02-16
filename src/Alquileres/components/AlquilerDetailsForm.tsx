import { Flex, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";

export function AlquilerDetailsForm() {
  return (
    <Flex direction="row" gap="1rem">
      <Flex direction="column" gap="1rem">
        <TextInput w="15rem" label="Productora" />
        <TextInput w="15rem" label="Proyecto" />
      </Flex>
      <DateTimePicker
        label="Fecha de inicio"
        placeholder="Pick date"
        w="15rem"
        valueFormat="DD/MM/YYYY HH:mm"
      />
      <DateTimePicker
        label="Fecha de fin"
        placeholder="Pick date"
        w="15rem"
        valueFormat="DD/MM/YYYY HH:mm"
      />
    </Flex>
  );
}
