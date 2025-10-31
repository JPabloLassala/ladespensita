import { useEffect, useState } from "react";
import { ProductoCard } from "../components/ProductoCard";
import { useProductosContext } from "../stores";
import { FilterContextProvider } from "@/Common";
import { FilterProducts, ProductosListContainer, ProductosPageContainer } from "../components";
import { useProductoRepository } from "../repository";
import { CreateNewProducto } from "../components/CreateNewProducto";
import { ProductoEntityCreate, ProductoEntityUpdate } from "../entities";

export function ProductosPage() {
  const [firstLoad, setFirstLoad] = useState(true);
  const {
    productos,
    setProductos,
    updateProducto,
    deleteProducto,
    createProducto,
    getUpdateProductoFormData,
  } = useProductosContext();
  const { data, sendList, sendCreate, sendUpdate, sendDelete } = useProductoRepository(productos);

  useEffect(() => {
    if (firstLoad) {
      setProductos(data);
    }
    if (data.length > 0) {
      setFirstLoad(false);
    }
  }, [data, firstLoad]);

  useEffect(() => {
    sendList();
  }, []);

  const handleUpdate = (producto: ProductoEntityUpdate, id: number) => {
    const formData = getUpdateProductoFormData(producto);

    sendUpdate(formData, id);
    updateProducto(producto);
  };

  const handleDelete = (id: number) => {
    sendDelete(id);
    deleteProducto(id);
  };

  const handleCreate = (producto: ProductoEntityCreate) => {
    const formData = getUpdateProductoFormData(producto);
    sendCreate(formData);
    createProducto(producto);
  };

  return (
    <FilterContextProvider>
      <ProductosPageContainer>
        <FilterProducts />
        <ProductosListContainer>
          <CreateNewProducto onCreate={handleCreate} />
          {productos.map((p) => (
            <ProductoCard
              key={p.id}
              producto={p}
              dimmed={false}
              disabled={false}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ProductosListContainer>
      </ProductosPageContainer>
    </FilterContextProvider>
  );
}
