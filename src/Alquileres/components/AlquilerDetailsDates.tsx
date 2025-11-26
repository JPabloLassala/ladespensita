import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import dayjs from "dayjs";

export function AlquilerDetailsDates({ form }: { form: UseFormReturnType<any> }) {
  const handleChange = (value: DatesRangeValue<string>) => {
    const fechaInicio = value[0] ? dayjs(value[0]).startOf("day").toDate() : null;
    const fechaFin = value[1] ? dayjs(value[1]).startOf("day").toDate() : null;
    form.setFieldValue("fechaInicio", fechaInicio);
    form.setFieldValue("fechaFin", fechaFin);
    form.setFieldValue("fechas", value);
  };

  return (
    <DatePickerInput
      type="range"
      flex={1}
      leftSection={<FontAwesomeIcon icon={faCalendar} />}
      leftSectionPointerEvents="none"
      label="Fechas de inicio y fin"
      placeholder="Pick date"
      {...form.getInputProps("fechas")}
      onChange={handleChange}
    />
  );
}
