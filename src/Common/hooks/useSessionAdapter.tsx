import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export function useSessionAdapter() {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    const cookies = new Cookies();
    const getDayTimestamp = () => Date.now() + 1000 * 60 * 60 * 24;
    cookies.set("token", token, {
      path: "/",
      expires: new Date(getDayTimestamp() * 7),
    });
  }, [token]);

  async function login(username: string, password: string) {
    const apiUrl = import.meta.env.VITE_API_HOST;
    setError("");
    setIsLoading(true);

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      return;
    }

    setToken(data.access_token);
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
