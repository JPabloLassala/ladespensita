import { useEffect, useState } from "react";
import { ProductoCard } from "../components/ProductoCard";
import { useProductosContext } from "../stores";
import { useFilterContext } from "@/Common";
import { FilterProducts, ProductosListContainer, ProductosPageContainer } from "../components";
import { useProductoRepository } from "../repository";
import { CreateNewProducto } from "../components/CreateNewProducto";
import { ProductoEntityCreate, ProductoEntityUpdate } from "../entities";
import { useAlquilerProductoRepository } from "@/Alquileres/repository";

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
  const { filter, setFilteredProductos, filteredProductos } = useFilterContext();
  const { sendGetStock, stockData } = useAlquilerProductoRepository();
  const { data, sendList, sendCreate, sendUpdate, sendDelete } = useProductoRepository(productos);

  useEffect(() => {
    if (!data.length) return;
    if (firstLoad) {
      setProductos(data);
    }

    setFirstLoad(false);
  }, [data, firstLoad]);

  useEffect(() => {
    sendList();
  }, []);

  useEffect(() => {
    if (!productos.length) return;
    setFilteredProductos(productos);
  }, [productos]);

  const handleUpdate = (producto: ProductoEntityUpdate, id: number) => {
    const formData = getUpdateProductoFormData(producto);
    sendUpdate(formData, id);
    updateProducto(producto.id, producto);
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

  useEffect(() => {
    setFilteredProductos(
      productos.filter((producto) => {
        if (
          filter.nameEnabled &&
          !producto.nombre.toLowerCase().includes(filter.name.toLowerCase())
        ) {
          return false;
        }
        if (filter.sinceDateEnabled && filter.sinceDate && stockData.length > 0) {
          const stockItem = stockData.find((s) => s.productoId === producto.id);
          if (!stockItem || stockItem.remaining <= 0) {
            return false;
          }
        }
        if (filter.untilDateEnabled && filter.untilDate && stockData.length > 0) {
          const stockItem = stockData.find((s) => s.productoId === producto.id);
          if (!stockItem || stockItem.remaining <= 0) {
            return false;
          }
        }

        return true;
      }),
    );
  }, [filter, stockData]);

  useEffect(() => {
    if (filter.sinceDate && filter.untilDate) {
      sendGetStock(filter.sinceDate.toDate(), filter.untilDate.toDate());
    }
  }, [filter.sinceDate, filter.untilDate]);

  return (
    <ProductosPageContainer>
      <FilterProducts />
      <ProductosListContainer>
        <CreateNewProducto onCreate={handleCreate} />
        {filteredProductos.map((p) => (
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
  );
}
