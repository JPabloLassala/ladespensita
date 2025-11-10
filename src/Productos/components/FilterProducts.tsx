import dayjs from "dayjs";
import { useFilterContext } from "@/Common";
import { Button, Checkbox, CloseButton, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faSearch } from "@fortawesome/free-solid-svg-icons";
import { DatePickerInput } from "@mantine/dates";

export function FilterProducts() {
  const { setFilter } = useFilterContext();

  const filterForm = useForm({
    initialValues: {
      name: "",
      searchName: false,
      sinceDate: null as string | null,
      searchSinceDate: false,
      untilDate: null as string | null,
      searchUntilDate: false,
      showUnavailable: false,
    },
    onValuesChange: (values, prevValues) => {
      // Check boxes when first enter value
      if (values.name !== "" && !prevValues.searchName)
        filterForm.setFieldValue("searchName", true);
      if (values.sinceDate && !prevValues.searchSinceDate)
        filterForm.setFieldValue("searchSinceDate", true);
      if (values.untilDate && !prevValues.searchUntilDate)
        filterForm.setFieldValue("searchUntilDate", true);

      // Uncheck boxes when clearing value
      if (values.name === "" && prevValues.searchName)
        filterForm.setFieldValue("searchName", false);
      if (!values.sinceDate && prevValues.searchSinceDate)
        filterForm.setFieldValue("searchSinceDate", false);
      if (!values.untilDate && prevValues.searchUntilDate)
        filterForm.setFieldValue("searchUntilDate", false);

      setFilter({
        name: values.name,
        nameEnabled: values.searchName,
        sinceDate: values.sinceDate ? dayjs(values.sinceDate) : undefined,
        sinceDateEnabled: values.searchSinceDate,
        untilDate: values.untilDate ? dayjs(values.untilDate) : undefined,
        untilDateEnabled: values.searchUntilDate,
        showUnavailable: values.showUnavailable,
      });
    },
  });

  const handleResetForm = () => {
    filterForm.reset();
  };

  return (
    <Group justify="center">
      <Stack>
        <Checkbox
          label="Buscar según nombre"
          {...filterForm.getInputProps("searchName", { type: "checkbox" })}
        />
        <TextInput
          leftSection={<FontAwesomeIcon icon={faSearch} className="text-slate-500" />}
          rightSection={<CloseButton onClick={() => filterForm.setFieldValue("name", "")} />}
          {...filterForm.getInputProps("name")}
        />
      </Stack>
      <Stack w="10rem">
        <Checkbox
          label="Incluir desde"
          {...filterForm.getInputProps("searchSinceDate", { type: "checkbox" })}
        />
        <DatePickerInput
          clearable
          leftSection={<FontAwesomeIcon icon={faCalendar} className="text-slate-500" />}
          valueFormat="DD / MM / YYYY"
          placeholder="Disponible desde"
          {...filterForm.getInputProps("sinceDate")}
        />
      </Stack>
      <Stack w="10rem">
        <Checkbox
          label="Incluir hasta"
          {...filterForm.getInputProps("searchUntilDate", { type: "checkbox" })}
        />
        <DatePickerInput
          clearable
          leftSection={<FontAwesomeIcon icon={faCalendar} className="text-slate-500" />}
          valueFormat="DD / MM / YYYY"
          placeholder="Disponible hasta"
          {...filterForm.getInputProps("untilDate")}
        />
      </Stack>
      <Stack>
        <Checkbox
          id="filterToday"
          label="Mostrar no incluidos"
          {...filterForm.getInputProps("showUnavailable", { type: "checkbox" })}
        />
        <Button onClick={handleResetForm} color="gray">
          Restablecer
        </Button>
      </Stack>
    </Group>
  );
}
