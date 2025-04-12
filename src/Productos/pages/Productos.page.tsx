import { useContext, useEffect } from "react";
import { ProductoCard } from "../components/ProductoCard";
import { ProductosContext } from "../stores";
import { FilterContextProvider } from "@/Common";
import { FilterProducts, ProductosListContainer, ProductosPageContainer } from "../components";
import { useProductoRepository } from "../repository";
import { CreateNewProducto } from "../components/CreateNewProducto";

export function ProductosPage() {
  const { productos, setProductos } = useContext(ProductosContext)!;
  const { data, sendList } = useProductoRepository([]);

  useEffect(() => {
    console.log("setting productos");
    setProductos(data);
  }, [data]);

  useEffect(() => {
    console.log("sending list");
    sendList();
  }, []);

  return (
    <FilterContextProvider>
      <ProductosPageContainer>
        <FilterProducts />
        <ProductosListContainer>
          <CreateNewProducto />
          {productos.map((p) => (
            <ProductoCard key={p.id} producto={p} dimmed={false} disabled={false} />
          ))}
        </ProductosListContainer>
      </ProductosPageContainer>
    </FilterContextProvider>
  );
}
