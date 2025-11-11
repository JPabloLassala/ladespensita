import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

export function AlquilerDetailsForm({
  form,
  setDatesTouched,
}: {
  form: any;
  setDatesTouched: React.Dispatch<
    React.SetStateAction<{
      inicio: boolean;
      fin: boolean;
    }>
  >;
}) {
  const handleDatesChange = (dates: (Date | null)[]) => {
    form.setFieldValue("fechas", dates);
    setDatesTouched({
      inicio: dates[0] !== null,
      fin: dates[1] !== null,
    });
  };

  return (
    <Grid gutter="md">
      <Grid.Col span="auto">
        <TextInput
          w="15rem"
          key={form.key("proyecto")}
          label="Proyecto"
          tabIndex={1}
          {...form.getInputProps("proyecto")}
        />
        <TextInput
          w="15rem"
          key={form.key("productora")}
          label="Productora"
          tabIndex={2}
          {...form.getInputProps("productora")}
        />
      </Grid.Col>
      <Grid.Col span="auto">
        <DatePickerInput
          type="range"
          leftSection={<FontAwesomeIcon icon={faCalendar} />}
          leftSectionPointerEvents="none"
          w="20rem"
          label="Fechas de inicio y fin"
          placeholder="Pick date"
          {...form.getInputProps("fechas")}
          onChange={handleDatesChange}
        />
      </Grid.Col>
    </Grid>
  );
}
