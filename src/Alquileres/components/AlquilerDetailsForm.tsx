import { Flex, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useContext } from "react";
import { AlquileresContext } from "../stores";

export function AlquilerDetailsForm() {
  const { selectedAlquiler } = useContext(AlquileresContext)!;

  return (
    <Flex direction="row" gap="1rem">
      <Flex direction="column" gap="1rem">
        <TextInput
          w="15rem"
          label="Productora"
          value={selectedAlquiler?.productora}
          onChange={(value) => console.log(value)}
        />
        <TextInput
          w="15rem"
          label="Proyecto"
          value={selectedAlquiler?.proyecto}
          onChange={(value) => console.log(value)}
        />
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
