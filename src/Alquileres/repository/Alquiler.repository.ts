import Cookies from "universal-cookie";
import { useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import { AlquilerEntity } from "../entities";

export function useAlquilerRepository(initialData: AlquilerEntity[] = []) {
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
      await fetch(`${apiHost}/alquiler/${id}`, {
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

  const sendCreate = useCallback(async function sendCreate(
    data: AlquilerEntity,
  ): Promise<AlquilerEntity | undefined> {
    setIsLoading(true);

    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const resData = await axios.post<AlquilerEntity>(
        `${apiHost}/alquiler`,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const alquiler = await resData.data;

      return alquiler;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      }
    }

    setIsLoading(false);
  }, []);

  const sendUpdate = useCallback(async function sendUpdate(
    data: Partial<AlquilerEntity>,
  ): Promise<void> {
    setIsLoading(true);

    try {
      const apiHost = import.meta.env.VITE_API_HOST;
      const resData = await fetch(`${apiHost}/alquiler/${data.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const producto = await resData.json();
      return producto;
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
      const resData = await fetch(`${apiHost}/alquiler`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const alquileres = await resData.json();

      setData(alquileres);
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
      const resData = await fetch(`${apiHost}/alquiler/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const alquiler = await resData.json();

      setData(alquiler);
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
