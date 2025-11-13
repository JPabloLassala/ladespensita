import Cookies from "universal-cookie";
import { ProductoEntity } from "../entities";
import { useCallback } from "react";
import { useState } from "react";
import axios, { AxiosError } from "axios";

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
    setError(undefined);
    setIsLoading(true);

    try {
      await axios.delete(`${apiHost}/producto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setData((oldData) => oldData.filter((producto) => producto.id !== id));
      return true;
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || error.message || "Something went wrong");
      } else if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }

    return false;
  }, []);

  const sendCreate = useCallback(async function sendCreate(newProductoFormData: FormData) {
    setIsLoading(true);
    setError(undefined);
    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const resData = await axios.post<ProductoEntity>(`${apiHost}/producto`, newProductoFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const producto = await resData.data;
      setData((oldData) => [producto, ...oldData]);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || error.message || "Something went wrong");
      } else if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      }
    }

    setIsLoading(false);
  }, []);

  const sendUpdate = useCallback(async function sendUpdate(
    productoFormData: FormData,
    id: number,
  ): Promise<void> {
    setIsLoading(true);

    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const resData = await axios.put<ProductoEntity>(
        `${apiHost}/producto/${id}`,
        productoFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const producto = await resData.data;

      setData((oldData) => oldData.map((p) => (p.id === producto.id ? producto : p)));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      }
    }

    setIsLoading(false);
  }, []);

  const sendList = useCallback(async function sendList() {
    setIsLoading(true);
    setError(undefined);

    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const response = await axios.get<ProductoEntity[]>(`${apiHost}/producto`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

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

  const sendGet = useCallback(async function sendGet(id: number) {
    setIsLoading(true);
    setError(undefined);

    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const response = await axios.get<ProductoEntity>(`${apiHost}/producto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setData([response.data]);
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
