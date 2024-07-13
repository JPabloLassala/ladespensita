import { useContext, useEffect } from "react";
import { ProductoCard } from "./ProductoCard";
import { ProductsContext } from "../stores";
import { useHttp } from "../hooks";
import { ProductoType } from "../schemas";
import { FilterProducts, ProductosListContainer, ProductosPageContainer } from "./UI";

export function ProductosPage() {
  const { productos, setProductos } = useContext(ProductsContext)!;
  const { data } = useHttp<ProductoType>("http://127.0.0.1:3000/productos", {}, []);

  useEffect(() => {
    if (data) {
      setProductos(data);
    }
  }, [data]);

  return (
    <ProductosPageContainer>
      <FilterProducts />
      <ProductosListContainer>
        {productos.map((p) => (
          <ProductoCard key={p.id} producto={p} dimmed={false} disabled={false} />
        ))}
      </ProductosListContainer>
    </ProductosPageContainer>
  );
}
