import { useState, useCallback } from "react";
import { clientUserApi } from "@/core";
import type { IErrorResponse, IResponse } from "../toolbox";
import { ResponseType } from "../toolbox";

interface IUser {
  codigo: string;
  id: number;
  nombre: string;
}

interface IRol {
  codigo: string;
  id: number;
  nombre: string;
}

interface ICreateParams {
  account: number;
  name: string;
  description: string;
  email: string;
  phone: string;
}

interface IUpdateParams {
  id: number;
  name: string;
  description: string;
  email: string;
  phone: string;
}

export const useUserHook = () => {
  const [userResponse, setUserResponse] = useState<IUser[]>([]);
  const [rolResponse, setRolResponse] = useState<IRol[]>([]);
  const [response, setResponse] = useState<IResponse>({
    message: "",
    type: ResponseType.INITIAL,
  });

  const fetchGetUser = useCallback(async () => {
    setResponse({ message: "Cargando datos...", type: ResponseType.LOADING });

    try {
      const resRoles = await clientUserApi.GetRol();
      const roles = resRoles.list;
      setRolResponse(roles);

      const userPromises = roles.map((rol: IRol) =>
        clientUserApi.GetUser(rol.id),
      );

      const results = await Promise.all(userPromises);

      const allUsers = results.flatMap((res) => res.list);

      setUserResponse(allUsers);
      setResponse({ message: "", type: ResponseType.SUCCESS });
    } catch (error) {
      const message =
        (error as IErrorResponse).response?.data?.mensaje ||
        "Error desconocido";
      setResponse({ message, type: ResponseType.ERROR });
    }
  }, []);

  const fetchCreateUser = async (data: ICreateParams) => {
    setResponse({ message: "Cargando...", type: ResponseType.LOADING });
    try {
      const res = await clientUserApi.CreateUser({
        name: data.name,
        description: data.description,
        email: data.email,
        phone: data.phone,
        accountId: data.account,
      });

      setResponse({ message: "", type: ResponseType.SUCCESS });
    } catch (error) {
      const message = (error as IErrorResponse).response.data.mensaje;
      setResponse({ message, type: ResponseType.ERROR });
    }
  };

  const fetchDeleteUser = async (id: number) => {
    setResponse({ message: "Cargando...", type: ResponseType.LOADING });
    try {
      const res = await clientUserApi.DeleteUser(id);
      setResponse({ message: "", type: ResponseType.SUCCESS });
    } catch (error) {
      const message = (error as IErrorResponse).response.data.mensaje;
      setResponse({ message, type: ResponseType.ERROR });
    }
  };

  const fetchUpdateUser = async (data: IUpdateParams) => {
    setResponse({ message: "Cargando...", type: ResponseType.LOADING });
    try {
      const res = await clientUserApi.UpdateUser({
        name: data.name,
        description: data.description,
        email: data.email,
        phone: data.phone,
        id: data.id,
      });
      setResponse({ message: "", type: ResponseType.SUCCESS });
    } catch (error) {
      const message = (error as IErrorResponse).response.data.mensaje;
      setResponse({ message, type: ResponseType.ERROR });
    }
  };

  return {
    userResponse,
    response,
    fetchGetUser,
    fetchCreateUser,
    fetchUpdateUser,
    fetchDeleteUser,
    rolResponse,
  };
};
