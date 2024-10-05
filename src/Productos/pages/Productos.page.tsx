import { useContext, useEffect } from "react";
import { ProductoCard } from "../components/ProductoCard";
import { ProductosContext } from "../stores";
import { ProductoEntity } from "../entities";
import { useHttpRepository } from "@/Common";
import { FilterContextProvider } from "@/Common";
import { FilterProducts, ProductosListContainer, ProductosPageContainer } from "../components";

export function ProductosPage() {
  const { productos, setProductos } = useContext(ProductosContext)!;
  const { data } = useHttpRepository<ProductoEntity>("http://127.0.0.1:3000/productos", {}, []);

  useEffect(() => {
    if (data) {
      setProductos(data);
    }
  }, [data]);

  return (
    <FilterContextProvider>
      <ProductosPageContainer>
        <FilterProducts />
        <ProductosListContainer>
          {productos.map((p) => (
            <ProductoCard key={p.id} producto={p} dimmed={false} disabled={false} />
          ))}
        </ProductosListContainer>
      </ProductosPageContainer>
    </FilterContextProvider>
  );
}
