import Cookies from "universal-cookie";
import { Alquiler } from "../entities";

export const getAlquileresRepository = (): {
  get: (id: number) => Promise<Alquiler>;
  list: () => Promise<Alquiler[]>;
  create: (data: Omit<Alquiler, "id">) => Promise<Alquiler>;
  update: (data: Partial<Alquiler>) => Promise<Alquiler>;
  remove: (id: number) => Promise<void>;
} => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const getHeaders = () => ({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });

  const get = async (id: number): Promise<Alquiler> => {
    const apiHost = import.meta.env.VITE_API_HOST;
    const response = await fetch(`${apiHost}/alquiler/${id}`, {
      method: "GET",
      headers: getHeaders(),
    });

    const alquiler = await response.json();

    return alquiler as Alquiler;
  };

  const list = async (): Promise<Alquiler[]> => {
    const apiHost = import.meta.env.VITE_API_HOST;
    const response = await fetch(`${apiHost}/alquiler`, {
      method: "GET",
      headers: getHeaders(),
    });

    const alquileres = await response.json();

    return alquileres as Alquiler[];
  };

  const create = async (data: Omit<Alquiler, "id">): Promise<Alquiler> => {
    const apiHost = import.meta.env.VITE_API_HOST;
    const response = await fetch(`${apiHost}/alquiler`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    const alquiler = await response.json();

    return alquiler as Alquiler;
  };

  const update = async (data: Partial<Alquiler>): Promise<Alquiler> => {
    const apiHost = import.meta.env.VITE_API_HOST;
    const response = await fetch(`${apiHost}/alquiler/${data.id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    const alquiler = await response.json();

    return alquiler as Alquiler;
  };

  const remove = async (id: number): Promise<void> => {
    const apiHost = import.meta.env.VITE_API_HOST;
    await fetch(`${apiHost}/alquiler/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
  };

  return { get, list, create, update, remove };
};
