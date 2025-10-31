import { Flex, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useAlquileresContext } from "../stores";

export function AlquilerDetailsForm() {
  const { selectedAlquiler } = useAlquileresContext();

  return (
    <Flex direction="row" gap="1rem">
      <Flex direction="column" gap="1rem">
        <TextInput w="15rem" label="Productora" defaultValue={selectedAlquiler?.productora} />
        <TextInput w="15rem" label="Proyecto" defaultValue={selectedAlquiler?.proyecto} />
      </Flex>
      <Flex direction="column" gap="1rem">
        <DateTimePicker
          label="Fecha de inicio"
          placeholder="Pick date"
          value={new Date(selectedAlquiler?.fechaAlquiler?.inicio || "")}
          onChange={(value) => console.log(value)}
          w="15rem"
          valueFormat="DD/MM/YYYY HH:mm"
        />
        <DateTimePicker
          label="Fecha de fin"
          placeholder="Pick date"
          value={new Date(selectedAlquiler?.fechaAlquiler?.fin || "")}
          onChange={(value) => console.log(value)}
          w="15rem"
          valueFormat="DD/MM/YYYY HH:mm"
        />
      </Flex>
    </Flex>
  );
}
