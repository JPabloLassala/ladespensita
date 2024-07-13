import { useContext } from "react";
import dayjs from "dayjs";
import { ProductsContext } from "../../stores";
import { FilterContext } from "../../stores/Filter.context";
import { Button, Checkbox } from "../../Shared";
import { SearchInputField } from "../SearchInputField";
import { DateInputField } from "../DateInputField";

export function FilterProducts() {
  const { setProductos, productos } = useContext(ProductsContext)!;
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
    <div className="flex flex-row gap-2">
      <SearchInputField
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
      <Checkbox
        id="filterToday"
        label="Mostrar no incluidos"
        checked={showUnavailable}
        onCheck={handleShowUnavailable}
      />
      <div className="mt-5 flex items-center text-white">
        <Button label="Filtrar" isSubmit className="bg-blue-600 hover:bg-blue-500" />
        <Button
          onClick={resetProducts}
          label="Reestablecer"
          className="bg-red-600 hover:bg-red-500"
        />
      </div>
    </div>
  );
}
