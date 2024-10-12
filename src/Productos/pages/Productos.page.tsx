import { useContext, useEffect } from "react";
import { ProductoCard } from "../components/ProductoCard";
import { ProductosContext } from "../stores";
import { ProductoEntity } from "../entities";
import { useHttpRepository } from "@/Common";
import { FilterContextProvider } from "@/Common";
import { FilterProducts, ProductosListContainer, ProductosPageContainer } from "../components";
import { getProductoRepository } from "../repository";

export function ProductosPage() {
  const { productos, setProductos } = useContext(ProductosContext)!;
  const { data } = useHttpRepository<ProductoEntity>([], getProductoRepository());

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
