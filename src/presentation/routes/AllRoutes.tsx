import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { ROUTE_LOGIN, ROUTE_DASHBOARD } from "../toolbox/constants";
import { PrivateRoute } from "./PrivateRoute";
import { Dashboard, Login } from "../features";
import { LayoutAdmin, LayoutPublic, NotFound } from "../components";

export const allRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={ROUTE_DASHBOARD}
        element={
          <PrivateRoute>
            <LayoutAdmin>
              <Dashboard />
            </LayoutAdmin>
          </PrivateRoute>
        }
      />

      <Route
        path={ROUTE_LOGIN}
        element={
          <LayoutPublic>
            <Login />
          </LayoutPublic>
        }
      />
      <Route path={ROUTE_LOGIN} element={<Login />} />
      <Route path={"*"} element={<NotFound />} />
    </>,
  ),
);
