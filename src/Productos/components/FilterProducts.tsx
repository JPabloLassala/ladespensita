import { useContext } from "react";
import dayjs from "dayjs";
import { ProductosContext } from "@/Productos/stores";
import { FilterContext } from "@/Common";
import { DateInputField } from "./UI/DateInputField";
import { Button, Checkbox, Group, Stack } from "@mantine/core";
import { SearchProducts } from "./UI/SearchProducts";

export function FilterProducts() {
  const { setProductos, productos } = useContext(ProductosContext)!;
  const {
    name,
    setName,
    toggleEnableName,
    nameEnabled,
    sinceDate,
    setSinceDate,
    untilDate,
    setUntilDate,
    showUnavailable,
    toggleShowUnavailable,
  } = useContext(FilterContext)!;

  function resetProducts() {
    setProductos(productos);
  }

  function handleShowUnavailable() {
    toggleShowUnavailable();
  }

  function handleSetSinceDate(value: string) {
    const date = dayjs(value);
    setSinceDate(date);
  }

  function handleSetUntilDate(value: string) {
    const date = dayjs(value);
    setUntilDate(date);
  }

  return (
    <Group justify="center">
      <SearchProducts
        onToggleSearch={toggleEnableName}
        searchEnabled={nameEnabled}
        value={name}
        onChangeValue={setName}
        id="filterName"
        placeholder="Buscar según nombre"
        label="Buscar"
      />
      <DateInputField
        id="filterFrom"
        label="Disponible desde"
        onSetDate={handleSetSinceDate}
        value={sinceDate}
      />
      <DateInputField
        id="filterUntil"
        label="Disponible hasta"
        onSetDate={handleSetUntilDate}
        value={untilDate}
      />

      <Stack>
        <Checkbox
          id="filterToday"
          label="Mostrar no incluidos"
          checked={showUnavailable}
          onChange={handleShowUnavailable}
        />
        <Group>
          <Button type="submit">Filtrar</Button>
          <Button onClick={resetProducts} color="gray">
            Restablecer
          </Button>
        </Group>
      </Stack>
    </Group>
  );
}
