import { useSessionAdapter } from "@/Common";
import { Button } from "@/Shared";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const { login, error, token } = useSessionAdapter();
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(fd.entries());

    login(loginData.user as string, loginData.pass as string);
  };

  useEffect(() => {
    if (token) {
      console.log("logged in");
      return navigate("/productos");
    }
  }, [token]);

  return (
    <form
      onSubmit={handleLogin}
      className="w-1/4 h-1/4 min-h-1/4 rounded-md bg-white text-sm shadow-md p-4"
    >
      <div className="flex flex-col w-full h-full justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-3xl font-body font-bold mb-2">Login</p>
          <div className="flex flex-row justify-between gap-2">
            <label htmlFor="usuario" className="block w-1/2">
              Usuario:
            </label>
            <input className="border  w-full" type="text" name="user" id="user"></input>
          </div>
          <div className="flex flex-row gap-2">
            <label htmlFor="pass" className="block w-1/2">
              Contraseña:
            </label>
            <input className="border  w-full" type="text" name="pass" id="pass"></input>
          </div>
        </div>
        <div className="w-full justify-center flex">
          <Button isSubmit className="bg-blue-400 text-white w-1/3" label="login" />
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
}
