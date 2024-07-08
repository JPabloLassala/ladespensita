import { Producto } from "./Producto";
import { FilterProducts } from "../components/Alquileres/FilterProducts";
import { useContext, useEffect } from "react";
import { ProductsContext } from "../stores";
import { useHttp } from "../hooks";
import { ProductoType } from "../schemas";

export function Productos() {
  const { productos, setProductos } = useContext(ProductsContext)!;
  const { data } = useHttp<ProductoType>("http://127.0.0.1:3000/productos", {}, []);

  useEffect(() => {
    if (data) {
      setProductos(data);
    }
  }, [data]);

  return (
    <main className="flex flex-col items-center">
      <FilterProducts />
      <section
        id="Projects"
        className="mb-5 mt-10 grid gap-x-5 gap-y-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7"
      >
        {productos.map((p) => {
          return <Producto key={p.id} item={p} />;
        })}
      </section>
    </main>
  );
}
