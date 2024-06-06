import { Producto } from "./Producto";
import { FilterProducts } from "../components/FilterProducts";
import { useContext } from "react";
import {
  // AlquileresContext,
  ProductsContext,
} from "../stores";

export function Galeria() {
  // const { alquileres } = useContext(AlquileresContext)!;
  const { products } = useContext(ProductsContext)!;

  return (
    <main className="flex flex-col">
      <FilterProducts />
      <section
        id="Projects"
        className="mb-5 mt-10 grid w-full justify-center justify-items-center gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8"
      >
        {products.map((item) => {
          return <Producto key={item.id} item={item} />;
        })}
      </section>
    </main>
  );
}
