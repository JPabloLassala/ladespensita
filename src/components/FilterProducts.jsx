import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { DateInputField } from "./DateInputField";
import { SearchInputField } from "./SearchInputField";
import { Checkbox } from "./UI/Checkbox";
import { Button } from "./UI/Button";
import { useContext } from "react";
import { ProductsContext, initialProducts } from "../stores/Products.context";

export function FilterProducts() {
  const { setProducts } = useContext(ProductsContext);

  function resetProducts() {
    setProducts(initialProducts);
  }

  function handleFilterProducts(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    setProducts(prevProducts => {
      return prevProducts.filter(product => {
        if (
          formData.enablefilterDate &&
          product.name.toLowerCase().includes(formData.filterName.toLowerCase())
        ) {
          return true;
        }

        if (
          formData.enablefilterName &&
          !product.name.toLowerCase().includes(formData.filterName.toLowerCase())
        ) {
          return false;
        }

        return true;
      });
    });
  }

  return (
    <form className="flex flex-row gap-2" onSubmit={handleFilterProducts}>
      <SearchInputField id="filterName" placeholder="Buscar según nombre" label="Buscar" />
      <DateInputField id="filterFrom" icon={faCalendar} label="Disponible desde" type="date" />
      <DateInputField id="filterUntil" icon={faCalendar} label="Disponible hasta" type="date" />
      <Checkbox id="filterToday" label="Mostrar no disponibles" />
      <div className="mt-5 flex items-center text-white">
        <Button label="Filtrar" isSubmit className="bg-blue-600 hover:bg-blue-500" />
        <Button
          onClick={resetProducts}
          label="Reestablecer"
          className="bg-red-600 hover:bg-red-500"
        />
      </div>
    </form>
  );
}
