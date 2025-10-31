import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

export function AlquilerDetailsForm({ form }: { form: any }) {
  return (
    <Grid gutter="md">
      <Grid.Col span="auto">
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
      </Grid.Col>
      <Grid.Col span="auto">
        <DatePickerInput
          leftSection={<FontAwesomeIcon icon={faCalendar} />}
          leftSectionPointerEvents="none"
          w="15rem"
          label="Fecha de inicio"
          placeholder="Pick date"
          valueFormat="DD/MM/YYYY HH:mm"
          key={form.key("fechaInicio")}
          {...form.getInputProps("fechaInicio")}
        />
        <DatePickerInput
          leftSection={<FontAwesomeIcon icon={faCalendar} />}
          leftSectionPointerEvents="none"
          w="15rem"
          label="Fecha de fin"
          placeholder="Pick date"
          valueFormat="DD/MM/YYYY HH:mm"
          key={form.key("fechaFin")}
          {...form.getInputProps("fechaFin")}
        />
      </Grid.Col>
    </Grid>
  );
}
