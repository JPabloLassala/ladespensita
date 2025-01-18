import Cookies from "universal-cookie";
import { ProductoEntity } from "../entities";
import { useCallback } from "react";
import { useState } from "react";

export function useProductoRepository(initialData: ProductoEntity[] = []) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [data, setData] = useState(initialData);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  function clearData() {
    setData(initialData);
  }

  const sendDelete = useCallback(async function sendDelete(id: number) {
    const apiHost = import.meta.env.VITE_API_HOST;

    setIsLoading(true);

    try {
      await fetch(`${apiHost}/producto/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      }
    }

    setIsLoading(false);
  }, []);

  const sendCreate = useCallback(async function sendCreate(data: ProductoEntity): Promise<void> {
    setIsLoading(true);

    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const resData = await fetch(`${apiHost}/producto`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const productos = await resData.json();

      setData((oldData) => [...oldData, productos]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      }
    }

    setIsLoading(false);
  }, []);

  const sendUpdate = useCallback(async function sendUpdate(
    data: Partial<ProductoEntity>,
  ): Promise<void> {
    setIsLoading(true);

    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const resData = await await fetch(`${apiHost}/producto/${data.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const producto = await resData.json();

      setData((oldData) => {
        const index = oldData.findIndex((p) => p.id === producto.id);
        oldData[index] = producto;
        return oldData;
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      }
    }

    setIsLoading(false);
  }, []);

  const sendList = useCallback(async function sendList() {
    setIsLoading(true);

    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const resData = await fetch(`${apiHost}/producto`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const productos = await resData.json();

      setData(productos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      }
    }

    setIsLoading(false);
  }, []);

  const sendGet = useCallback(async function sendGet(id: number) {
    setIsLoading(true);

    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const resData = await fetch(`${apiHost}/producto/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const producto = await resData.json();

      setData(producto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      }
    }

    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    sendCreate,
    sendDelete,
    sendUpdate,
    sendList,
    sendGet,
    clearData,
  };
}
