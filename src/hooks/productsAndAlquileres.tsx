import { useContext } from "react";
import { ProductsContext } from "../stores/Products.context";
import { AlquileresContext } from "../stores/Alquileres.context";
import { initialProducts } from "../constants";

export function useProductsAndAlquileres() {
  const { products, setProducts } = useContext(ProductsContext)!;
  const { alquileres, getAlquileresBetweenDates, getSummary, setAlquileres } =
    useContext(AlquileresContext)!;

  const getAvailableProducts = (sinceDate: string, untilDate: string) => {
    const alquileres = getAlquileresBetweenDates(sinceDate, untilDate);
    if (!alquileres.length) return setProducts(initialProducts);

    const alquileresProducts = alquileres.map((alquiler) => alquiler.products).flat();
    setProducts(
      initialProducts.filter((product) => {
        return !alquileresProducts.find((alquilerProduct) => alquilerProduct.id === product.id);
      }),
    );
  };

  return {
    products,
    setProducts,
    alquileres,
    getAlquileresBetweenDates,
    getSummary,
    setAlquileres,
    getAvailableProducts,
  };
}
