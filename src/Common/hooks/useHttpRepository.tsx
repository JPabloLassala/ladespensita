import { useCallback } from "react";
import { useState } from "react";

export function useHttpRepository<T extends { id: number }>(
  initialData: T[] = [],
  repositoryMethods: {
    list: () => Promise<T[]>;
    get: (id: number) => Promise<T>;
    create: (data: Omit<T, "id">) => Promise<T>;
    update: (data: Partial<T>) => Promise<T>;
    remove: (id: number) => Promise<void>;
  },
) {
  const [data, setData] = useState<T[]>(initialData);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  function clearData() {
    setData(initialData);
  }

  const sendDelete = useCallback(async function sendDelete(id: number) {
    setIsLoading(true);

    try {
      await repositoryMethods.remove(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      }
    }

    setIsLoading(false);
  }, []);

  const sendCreate = useCallback(async function sendCreate(data: T): Promise<void> {
    setIsLoading(true);

    try {
      const resData = await repositoryMethods.create(data);
      setData((prevData) => [...prevData, resData]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      }
    }

    setIsLoading(false);
  }, []);

  const sendUpdate = useCallback(async function sendUpdate(data: Partial<T>): Promise<void> {
    setIsLoading(true);

    try {
      const resData = await repositoryMethods.update(data);
      setData((prevData) => prevData.map((item) => (item.id === resData.id ? resData : item)));
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
      const resData = await repositoryMethods.list();
      setData(resData);
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
    clearData,
  };
}
