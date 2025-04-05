import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

export function useSessionAdapter() {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    const cookies = new Cookies();
    const getDayTimestamp = () => Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
    cookies.set("token", token, {
      path: "/",
      expires: new Date(getDayTimestamp()),
    });
  }, [token]);

  async function login(username: string, password: string) {
    const apiUrl = import.meta.env.VITE_API_HOST;
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { username, password });

      console.log(response.data);

      setToken(response.data.access_token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Error de conexión");
      } else {
        setError("Error de conexión");
      }
    }
  }

  async function logout() {
    setToken("");
  }

  return {
    error,
    isLoading,
    token,
    login,
    logout,
  };
}
