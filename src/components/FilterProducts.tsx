import { DateInputField } from "./DateInputField";
import { SearchInputField } from "./SearchInputField";
import { Checkbox } from "./UI/Checkbox";
import { Button } from "./UI/Button";
import { FormEvent, useContext } from "react";
import { ProductsContext } from "../stores/Products.context";
import { initialProducts } from "../constants";

export function FilterProducts() {
  const { setProducts } = useContext(ProductsContext)!;

  function resetProducts() {
    setProducts(initialProducts);
  }

  function handleFilterProducts(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fd = new FormData(event.currentTarget);
    const formData = Object.fromEntries(fd.entries());

    setProducts((prevProducts) => {
      return prevProducts.filter((product) => {
        if (
          formData.enablefilterDate &&
          product.name.toLowerCase().includes((formData.filterName as string).toLowerCase())
        ) {
          return true;
        }

        if (
          formData.enablefilterName &&
          !product.name.toLowerCase().includes((formData.filterName as string).toLowerCase())
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
      <DateInputField id="filterFrom" label="Disponible desde" />
      <DateInputField id="filterUntil" label="Disponible hasta" />
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
