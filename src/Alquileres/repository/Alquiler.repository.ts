import { Alquiler } from "../entities";

export const getAlquileresRepository = (): {
  get: (id: number) => Promise<Alquiler>;
  list: () => Promise<Alquiler[]>;
  create: (data: Omit<Alquiler, "id">) => Promise<Alquiler>;
  update: (data: Partial<Alquiler>) => Promise<Alquiler>;
  remove: (id: number) => Promise<void>;
} => {
  const get = async (id: number): Promise<Alquiler> => {
    const base_url = process.env.BASE_URL;
    const response = await fetch(`http://${base_url}/alquiler/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const alquiler = await response.json();

    return alquiler as Alquiler;
  };

  const list = async (): Promise<Alquiler[]> => {
    const base_url = process.env.BASE_URL;
    const response = await fetch(`http://${base_url}/alquiler`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const alquileres = await response.json();

    return alquileres as Alquiler[];
  };

  const create = async (data: Omit<Alquiler, "id">): Promise<Alquiler> => {
    const base_url = process.env.BASE_URL;
    const response = await fetch(`http://${base_url}/alquiler`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const alquiler = await response.json();

    return alquiler as Alquiler;
  };

  const update = async (data: Partial<Alquiler>): Promise<Alquiler> => {
    const base_url = process.env.BASE_URL;
    const response = await fetch(`http://${base_url}/alquiler/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const alquiler = await response.json();

    return alquiler as Alquiler;
  };

  const remove = async (id: number): Promise<void> => {
    const base_url = process.env.BASE_URL;
    await fetch(`http://${base_url}/alquiler/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return { get, list, create, update, remove };
};
