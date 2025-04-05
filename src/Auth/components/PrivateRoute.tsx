import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const cookies = new Cookies();
  const location = useLocation();

  if (cookies.get("token") && cookies.get("token") !== "undefined") {
    return <>{children}</>;
  }

  return (
    <Navigate
      replace={true}
      to="/login"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
}
