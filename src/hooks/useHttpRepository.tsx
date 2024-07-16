import { useCallback, useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";

export function useHttpRepository<T extends { id?: string }>(
  url: string,
  config: RequestInit,
  initialData: T[] = [],
) {
  const [data, setData] = useState<T[]>(initialData);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const configMemo = useMemo(() => config, []);

  function clearData() {
    setData(initialData);
  }

  const sendDelete = useCallback(
    async function sendDelete(id: string) {
      setIsLoading(true);

      try {
        await sendHttpRequest(`${url}/${id}`, { method: "DELETE" });
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Something went wrong");
        }
      }

      setIsLoading(false);
    },
    [url],
  );

  const sendCreate = useCallback(
    async function sendCreate(data: T): Promise<void> {
      setIsLoading(true);

      try {
        const resData = await sendHttpRequest(url, {
          method: "POST",
          body: JSON.stringify(data),
        });
        setData((prevData) => [...prevData, resData]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Something went wrong");
        }
      }

      setIsLoading(false);
    },
    [url],
  );

  const sendUpdate = useCallback(
    async function sendUpdate(data: Partial<T>): Promise<void> {
      setIsLoading(true);

      try {
        const resData = await sendHttpRequest(`${url}/${data.id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        setData((prevData) => prevData.map((item) => (item.id === resData.id ? resData : item)));
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Something went wrong");
        }
      }

      setIsLoading(false);
    },
    [url],
  );

  const sendList = useCallback(
    async function sendList(requestConfig?: Partial<RequestInit>) {
      setIsLoading(true);

      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          ...requestConfig,
        });
        setData(resData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Something went wrong");
        }
      }

      setIsLoading(false);
    },
    [url, configMemo],
  );

  const sendRequest = useCallback(
    async function sendRequest(data?: T[], requestConfig?: Partial<RequestInit>) {
      setIsLoading(true);

      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          ...requestConfig,
          body: JSON.stringify(data),
        });
        setData(resData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Something went wrong");
        }
      }

      setIsLoading(false);
    },
    [url, configMemo],
  );

  const getAlquiler = useCallback(
    async function getAlquiler(id: string) {
      setIsLoading(true);

      try {
        const resData = await sendHttpRequest(`${url}/${id}`, {
          method: "GET",
        });
        setData(resData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Something went wrong");
        }
      }

      setIsLoading(false);
    },
    [url],
  );

  useEffect(() => {
    if (config && (config.method === "GET" || !config.method)) {
      sendRequest();
    }
  }, [sendRequest, configMemo]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    sendCreate,
    sendDelete,
    sendUpdate,
    getAlquiler,
    sendList,
    clearData,
  };
}

async function sendHttpRequest(url: string, config: RequestInit) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong, failed to send request.");
  }

  return resData;
}
