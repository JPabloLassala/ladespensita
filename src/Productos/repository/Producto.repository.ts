import Cookies from "universal-cookie";
import { ProductoEntity } from "../entities";

export const getProductoRepository = (): {
  get: (id: number) => Promise<ProductoEntity>;
  list: () => Promise<ProductoEntity[]>;
  create: (data: Omit<ProductoEntity, "id">) => Promise<ProductoEntity>;
  update: (data: Partial<ProductoEntity>) => Promise<ProductoEntity>;
  remove: (id: number) => Promise<void>;
} => {
  const get = async (id: number): Promise<ProductoEntity> => {
    const base_url = process.env.BASE_URL;
    const response = await fetch(`http://${base_url}/producto/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const alquiler = await response.json();

    return alquiler as ProductoEntity;
  };

  const list = async (): Promise<ProductoEntity[]> => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const apiHost = import.meta.env.VITE_API_HOST;
    const response = await fetch(`${apiHost}/producto`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const alquileres = await response.json();

    return alquileres as ProductoEntity[];
  };

  const create = async (data: Omit<ProductoEntity, "id">): Promise<ProductoEntity> => {
    const base_url = process.env.BASE_URL;
    const response = await fetch(`http://${base_url}/producto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const alquiler = await response.json();

    return alquiler as ProductoEntity;
  };

  const update = async (data: Partial<ProductoEntity>): Promise<ProductoEntity> => {
    const base_url = process.env.BASE_URL;
    const response = await fetch(`http://${base_url}/producto/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const alquiler = await response.json();

    return alquiler as ProductoEntity;
  };

  const remove = async (id: number): Promise<void> => {
    const base_url = process.env.BASE_URL;
    await fetch(`http://${base_url}/producto/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return { get, list, create, update, remove };
};
