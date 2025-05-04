import { useContext, useEffect } from "react";
import { ProductoCard } from "../components/ProductoCard";
import { ProductosContext } from "../stores";
import { FilterContextProvider } from "@/Common";
import { FilterProducts, ProductosListContainer, ProductosPageContainer } from "../components";
import { useProductoRepository } from "../repository";
import { CreateNewProducto } from "../components/CreateNewProducto";
import { ProductoEntityCreate, ProductoEntityUpdate } from "../entities";
import { FileWithPath } from "@mantine/dropzone";

export function ProductosPage() {
  const { productos, setProductos, updateProducto } = useContext(ProductosContext)!;
  const { data, sendList, sendCreate, sendUpdate } = useProductoRepository(productos);

  useEffect(() => {
    setProductos(data);
  }, [data]);

  useEffect(() => {
    console.log("sending list");
    sendList();
  }, []);

  const handleUpdate = (producto: ProductoEntityUpdate, id: number) => {
    const formData = new FormData();
    formData.append("file", producto.file as FileWithPath);
    formData.append("nombre", producto.nombre);
    formData.append("unidadesMetroLineal", producto.unidadesMetroLineal.toString());
    formData.append("totales", producto.totales.toString());
    formData.append("altura", producto.altura?.toString() || "");
    formData.append("diametro", producto.diametro?.toString() || "");
    formData.append("ancho", producto.ancho?.toString() || "");
    formData.append("profundidad", producto.profundidad?.toString() || "");
    formData.append("valorUnitarioGarantia", producto.valorUnitarioGarantia.toString());
    formData.append("valorUnitarioAlquiler", producto.valorUnitarioAlquiler.toString());
    formData.append("valorx1", producto.valorx1.toString());
    formData.append("valorx3", producto.valorx3.toString());
    formData.append("valorx6", producto.valorx6.toString());
    formData.append("valorx12", producto.valorx12.toString());

    sendUpdate(formData, id);
    updateProducto(producto);
  };

  const handleCreate = (producto: ProductoEntityCreate) => {
    const formData = new FormData();
    formData.append("file", producto.file as FileWithPath);
    formData.append("nombre", producto.nombre);
    formData.append("unidadesMetroLineal", producto.unidadesMetroLineal.toString());
    formData.append("totales", producto.totales.toString());
    formData.append("altura", producto.altura?.toString() || "");
    formData.append("diametro", producto.diametro?.toString() || "");
    formData.append("ancho", producto.ancho?.toString() || "");
    formData.append("profundidad", producto.profundidad?.toString() || "");
    formData.append("valorUnitarioGarantia", producto.valorUnitarioGarantia.toString());
    formData.append("valorUnitarioAlquiler", producto.valorUnitarioAlquiler.toString());
    formData.append("valorx1", producto.valorx1.toString());
    formData.append("valorx3", producto.valorx3.toString());
    formData.append("valorx6", producto.valorx6.toString());
    formData.append("valorx12", producto.valorx12.toString());

    sendCreate(formData);
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
            />
          ))}
        </ProductosListContainer>
      </ProductosPageContainer>
    </FilterContextProvider>
  );
}
