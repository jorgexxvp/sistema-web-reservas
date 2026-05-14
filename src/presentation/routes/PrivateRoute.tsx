import { Navigate } from "react-router";

import type { FC, ReactNode } from "react";
import { ROUTE_LOGIN } from "../toolbox/constants/route";
import { useLoginStore } from "../zustand/useLoginStore";

interface IPrivateRouteProps {
  children: ReactNode;
}

const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    }

    return true;
  } catch {
    return false;
  }
};

export const PrivateRoute: FC<IPrivateRouteProps> = function ({ children }) {
  const { token, rol, logout } = useLoginStore();

  if (!token || !rol) {
    return <Navigate to={ROUTE_LOGIN} replace />;
  }

  if (!isTokenValid(token)) {
    logout();
    return <Navigate to={ROUTE_LOGIN} replace />;
  }

  return <>{children}</>;
};
