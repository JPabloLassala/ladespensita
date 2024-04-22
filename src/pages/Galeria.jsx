import { useContext } from "react";
import { Producto } from "./Producto";
import { ProductsContext } from "../stores/Products.context";

export function Galeria() {
  const { products } = useContext(ProductsContext);

  return (
    <section
      id="Projects"
      className="mb-5 mt-10 grid w-full grid-cols-1 justify-center justify-items-center gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-8"
    >
      {products.map((item) => {
        return <Producto key={item.id} item={item} />;
      })}
    </section>
  );
}
