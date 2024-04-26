import { useContext } from "react";
import { Producto } from "./Producto";
import { ProductsContext } from "../stores/Products.context";
import { FilterProducts } from "../components/FilterProducts";

export function Galeria() {
  const { products } = useContext(ProductsContext);

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
