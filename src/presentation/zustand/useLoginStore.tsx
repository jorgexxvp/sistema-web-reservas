import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IErrorResponse, IResponse } from "../toolbox";
import { ResponseType, ROUTE_DASHBOARD } from "../toolbox";
import { clientAuthApi } from "@/core";

export interface IAuthParams {
  name: string;
  password: string;
}

export interface ILoginStore {
  token: string | null;
  rol: string | null;
  name: string | null;
  response: IResponse;
  fetchAuth: (params: IAuthParams) => void;
  logout: () => void;
  fetchRecoveryPassword: (correo: string) => void;
  clearAuth: () => void;
}

export const useLoginStore = create<ILoginStore>()(
  persist(
    (set) => ({
      clearAuth: () =>
        set({
          rol: null,
          name: "",
          token: "",
        }),
      token: null,
      rol: null,
      name: null,
      response: { message: "", type: ResponseType.INITIAL },
      fetchAuth: async (params) => {
        set({
          response: {
            message: "Cargando...",
            type: ResponseType.LOADING,
          },
        });

        try {
          const response = await clientAuthApi.authUser({
            login: params.name,
            password: params.password,
          });

          set({
            token: response.token,
            rol: response.rolCodigo,
            name: response.nombre + " " + response.apellido,
            response: {
              message: "Autenticación exitosa",
              type: ResponseType.SUCCESS,
            },
          });

          window.location.href = ROUTE_DASHBOARD;
        } catch (error) {
          const message = (error as IErrorResponse).response.data.mensaje;

          set({
            response: {
              message: message,
              type: ResponseType.ERROR,
            },
          });
        }
      },

      logout: () => {
        set({
          token: null,
          rol: null,
          response: { message: "", type: ResponseType.INITIAL },
        });
        window.location.href = "/";
      },
      fetchRecoveryPassword: async (correo) => {
        set({
          response: {
            message: "Cargando...",
            type: ResponseType.LOADING,
          },
        });
        try {
          await clientAuthApi.recoveryPassword(correo);
          set({
            response: {
              message: "Correo de recuperación enviado",
              type: ResponseType.SUCCESS,
            },
          });
        } catch (error) {
          const message = (error as IErrorResponse).response.data.mensaje;
          set({
            response: {
              message: message,
              type: ResponseType.ERROR,
            },
          });
          setTimeout(() => {
            set({
              response: {
                message: "",
                type: ResponseType.INITIAL,
              },
            });
          }, 2000);
        }
      },
    }),

    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        rol: state.rol,
        name: state.name,
      }),
    },
  ),
);
