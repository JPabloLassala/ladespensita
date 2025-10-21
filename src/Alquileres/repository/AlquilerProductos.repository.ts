import axios from "axios";
import Cookies from "universal-cookie";
import { useCallback } from "react";
import { useState } from "react";
import { AlquilerProductoEntity, AlquilerProductoRemaining } from "../entities";

export function useAlquilerProductoRepository(initialData: AlquilerProductoEntity[] = []) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [data, setData] = useState(initialData);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [stockData, setStockData] = useState<AlquilerProductoRemaining[]>([]);

  function clearData() {
    setData(initialData);
  }

  const sendList = useCallback(async function sendGet(id: number) {
    setIsLoading(true);
    setError(undefined);

    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const response = await axios.get<AlquilerProductoEntity[]>(
        `${apiHost}/alquilerProducto/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setData(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || error.message || "Something went wrong");
      } else if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendGetRemaining = useCallback(async function sendGetRemaining() {
    setIsLoading(true);
    setError(undefined);

    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const response = await axios.get<AlquilerProductoRemaining[]>(
        `${apiHost}/alquilerProducto/stock`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setStockData(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || error.message || "Something went wrong");
      } else if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearStockData = () => {
    setStockData([]);
  };

  return {
    data,
    stockData,
    clearData,
    sendList,
    sendGetRemaining,
    clearStockData,
    isLoading,
    error,
  };
}
