import { useContext } from "react";
import { ProductsContext, initialProducts } from "../stores/Products.context";
import { AlquileresContext } from "../stores/Alquileres.context";

export function useProductsAndAlquileres() {
  const productsContext = useContext(ProductsContext);
  const alquileresContext = useContext(AlquileresContext);

  const getAvailableProducts = (sinceDate, untilDate) => {
    const alquileres = alquileresContext.getAlquileresBetweenDates(sinceDate, untilDate);
    if (!alquileres.length) return productsContext.setProducts(initialProducts);

    const alquileresProducts = alquileres.map(alquiler => alquiler.products).flat();
    productsContext.setProducts(
      productsContext.products.filter(product => !alquileresProducts.includes(product)),
    );
  };

  return {
    ...productsContext,
    ...alquileresContext,
    getAvailableProducts,
  };
}
