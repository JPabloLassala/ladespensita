import { Group, GroupProps, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

export function AlquilerDetailsForm({ form }: { form: UseFormReturnType<any> }) {
  return (
    <Group component="div" gap="md" flex={1}>
      <TextInput flex={1} label="Proyecto" tabIndex={1} {...form.getInputProps("proyecto")} />
      <TextInput flex={1} label="Productora" tabIndex={2} {...form.getInputProps("productora")} />
    </Group>
  );
}
