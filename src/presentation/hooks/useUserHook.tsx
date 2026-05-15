import { useState, useCallback } from "react";
import { clientMasterApi, clientUserApi } from "@/core";
import type { IErrorResponse, IResponse } from "../toolbox";
import { ResponseType } from "../toolbox";

interface IUser {
  codigo: string;
  id: number;
  nombre: string;
}

interface IUserDetails {
  usuarioId: number;
  rolId: number;
  rolNombre: string;
  nombre: string;
  apellido: string;
  correo: string;
  tipoDocumentoCodigo: string;
  documento: string;
  telefono: string;
  usuario: string;
  estadoCodigo: string;
  totalFaltas: number;
  habilitado: boolean;
  fechaSuspension: string;
  diasSuspension: number;
  fechaNacimiento: string;
}

interface IRol {
  codigo: string;
  id: number;
  nombre: string;
}

interface IGenericParams {
  usuarioId?: number;
  rolId: number;
  nombre: string;
  apellido: string;
  correo: string;
  tipoDocumentoCodigo: string;
  documento: string;
  telefono: string;
  usuario: string;
  password: string;
  estadoCodigo: string;
  fechaNacimiento: string;
}

export const useUserHook = () => {
  const [userResponse, setUserResponse] = useState<IUser[]>([]);
  const [userDetails, setUserDetails] = useState<IUserDetails>();
  const [rolResponse, setRolResponse] = useState<IRol[]>([]);
  const [response, setResponse] = useState<IResponse>({
    message: "",
    type: ResponseType.INITIAL,
  });

  const fetchGetUser = useCallback(async (userId: number) => {
    setResponse({ message: "Cargando datos...", type: ResponseType.LOADING });

    try {
      const response = await clientUserApi.GetUser(userId);

      setUserDetails(response);
      setResponse({ message: "", type: ResponseType.SUCCESS });
    } catch (error) {
      const message =
        (error as IErrorResponse).response?.data?.mensaje ||
        "Error desconocido";
      setResponse({ message, type: ResponseType.ERROR });
    }
  }, []);

  const fetchGetAllUser = useCallback(async () => {
    setResponse({ message: "Cargando datos...", type: ResponseType.LOADING });

    try {
      const resRoles = await clientMasterApi.GetRol();
      const roles = resRoles.list;
      setRolResponse(roles);

      const userPromises = roles.map((rol: IRol) =>
        clientUserApi.GetListUser(rol.id),
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

  const fetchCreateUser = async (data: IGenericParams) => {
    setResponse({ message: "Cargando...", type: ResponseType.LOADING });
    try {
      const response = await clientUserApi.CreateUser(data);

      setResponse({ message: response.mensaje, type: ResponseType.SUCCESS });
    } catch (error) {
      const message = (error as IErrorResponse).response.data.mensaje;
      setResponse({ message, type: ResponseType.ERROR });
    }
  };

  const fetchUpdateUser = async (data: IGenericParams) => {
    setResponse({ message: "Cargando...", type: ResponseType.LOADING });
    try {
      const response = await clientUserApi.UpdateUser(data);
      setResponse({ message: response.mensaje, type: ResponseType.SUCCESS });
    } catch (error) {
      const message = (error as IErrorResponse).response.data.mensaje;
      setResponse({ message, type: ResponseType.ERROR });
    }
  };

  // const fetchDeleteUser = async (id: number) => {
  //   setResponse({ message: "Cargando...", type: ResponseType.LOADING });
  //   try {
  //     const response = await clientUserApi.DeleteUser(id);
  //     setResponse({ message: response.mensaje, type: ResponseType.SUCCESS });
  //   } catch (error) {
  //     const message = (error as IErrorResponse).response.data.mensaje;
  //     setResponse({ message, type: ResponseType.ERROR });
  //   }
  // };

  return {
    userResponse,
    response,
    fetchGetUser,
    fetchGetAllUser,
    fetchCreateUser,
    fetchUpdateUser,
    rolResponse,
    userDetails,
  };
};
