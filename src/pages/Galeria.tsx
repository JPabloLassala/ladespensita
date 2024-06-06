import { Producto } from "./Producto";
import { FilterProducts } from "../components/FilterProducts";
import { useContext } from "react";
import { AlquileresContext, ProductsContext } from "../stores";
import { FilterContext } from "../stores/Filter.context";

export function Galeria() {
  const { alquileres } = useContext(AlquileresContext)!;
  const { products } = useContext(ProductsContext)!;
  const { showUnavailable } = useContext(FilterContext)!;
  const productosSinStock = products.filter((product) => {
    const unidadesAlquiladas = alquileres.reduce((acc, alquiler) => {
      const productFound = alquiler.products.find((p) => p.id === product.id);
      if (productFound) {
        return acc + productFound.cantidad;
      }
      return acc;
    }, 0);

    return product.unidadesDisponibles <= unidadesAlquiladas;
  });

  return (
    <main className="flex flex-col">
      <FilterProducts />
      <section
        id="Projects"
        className="mb-5 mt-10 grid w-full justify-center justify-items-center gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8"
      >
        {products.map((item) => {
          const disabled =
            !showUnavailable && productosSinStock.findIndex((p) => p.id === item.id) !== -1;
          const dimmed =
            showUnavailable && productosSinStock.findIndex((p) => p.id === item.id) !== -1;

          return <Producto key={item.id} item={item} disabled={disabled} dimmed={dimmed} />;
        })}
      </section>
    </main>
  );
}
