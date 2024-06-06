import { DateInputField } from "./DateInputField";
import { SearchInputField } from "./SearchInputField";
import { Checkbox } from "./UI/Checkbox";
import { Button } from "./UI/Button";
import {
  // FormEvent,
  useContext,
} from "react";
import { ProductsContext } from "../stores/Products.context";
import { initialProducts } from "../constants";
import { FilterContext } from "../stores/Filter.context";

export function FilterProducts() {
  const { setProducts } = useContext(ProductsContext)!;
  const {
    setShowUnavailable,
    showUnavailable,
    // setFilterDate,
    // sinceDate,
    untilDate,
    // setName,
    // name,
  } = useContext(FilterContext)!;

  function resetProducts() {
    setProducts(initialProducts);
  }

  function handleShowUnavailable() {
    setShowUnavailable((prevShowUnavailable) => !prevShowUnavailable);
  }

  function handleSetUntilDate() {}

  return (
    <div className="flex flex-row gap-2">
      <SearchInputField id="filterName" placeholder="Buscar según nombre" label="Buscar" />
      <DateInputField id="filterFrom" label="Disponible desde" />
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
