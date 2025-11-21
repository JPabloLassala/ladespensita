import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, TextInput } from "@mantine/core";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import dayjs from "dayjs";

export function AlquilerDetailsForm({ form }: { form: UseFormReturnType<any> }) {
  const handleChange = (value: DatesRangeValue<string>) => {
    const fechaInicio = value[0] ? dayjs(value[0]).startOf("day").toDate() : null;
    const fechaFin = value[1] ? dayjs(value[1]).startOf("day").toDate() : null;
    form.setFieldValue("fechaInicio", fechaInicio);
    form.setFieldValue("fechaFin", fechaFin);
    form.setFieldValue("fechas", value);
  };

  return (
    <Grid gutter="md" w="100%">
      <Grid.Col span={6}>
        <TextInput
          w="100%"
          key={form.key("proyecto")}
          label="Proyecto"
          tabIndex={1}
          {...form.getInputProps("proyecto")}
        />
        <TextInput
          w="100%"
          key={form.key("productora")}
          label="Productora"
          tabIndex={2}
          {...form.getInputProps("productora")}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <DatePickerInput
          type="range"
          leftSection={<FontAwesomeIcon icon={faCalendar} />}
          leftSectionPointerEvents="none"
          w="100%"
          label="Fechas de inicio y fin"
          placeholder="Pick date"
          {...form.getInputProps("fechas")}
          onChange={handleChange}
        />
      </Grid.Col>
    </Grid>
  );
}
