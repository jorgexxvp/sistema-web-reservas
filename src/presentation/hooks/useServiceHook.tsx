import { useState, useCallback } from "react";
import { clientServiceApi } from "@/core";
import type { IErrorResponse, IResponse } from "../toolbox";
import { ResponseType } from "../toolbox";

interface IService {
  categoriaId: number;
  categoriaNombre: string;
  duracion: number;
  habilitado: boolean;
  nombre: string;
  servicioId: number;
  descripcion: string;
  tarifa: number;
  tiempoTolerancia: string;
}

interface IGenericProps {
  id: number;
  codigo: string;
  nombre: string;
}

export interface IAvailability {
  horario: {
    hora: string;
    especialistas: {
      usuarioServicioId: number;
      especialistaId: number;
      especialistaNombre: string;
      especialistaApellido: string;
      disponible: boolean;
    }[];
  }[];
}

export interface IReserveParams {
  usuarioId: number;
  fecha: string;
  observacion: string;
  invitadoNombre: string;
  invitadoApellido: string;
  invitadoTelefono: string;
  invitadoCorreo: string;
  usuarioServicioId: number;
}

export interface IAvailabilityParams {
  servicioId: number;
  fecha: string;
}

export const useServiceHook = () => {
  const [serviceData, setServiceData] = useState<IService[]>([]);
  const [specialistData, setSpecialistData] = useState<IGenericProps[]>([]);
  const [availability, setAvailability] = useState<IAvailability>();
  const [response, setResponse] = useState<IResponse>({
    message: "",
    type: ResponseType.INITIAL,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(serviceData.length / 6);
  const lastIndex = currentPage * 6;
  const firstIndex = lastIndex - 6;

  const currentData = serviceData.slice(firstIndex, lastIndex);

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const fetchGetAllService = useCallback(async () => {
    setResponse({ message: "Cargando datos...", type: ResponseType.LOADING });

    try {
      const response = await clientServiceApi.GetServices();
      setResponse({ message: "", type: ResponseType.SUCCESS });
      setServiceData(response.elements);
    } catch (error) {
      const message =
        (error as IErrorResponse).response?.data?.mensaje ||
        "Error desconocido";
      setResponse({ message, type: ResponseType.ERROR });
    }
  }, []);

  const fetchAllSpecialist = useCallback(async (servicioId: number) => {
    setResponse({ message: "Cargando datos...", type: ResponseType.LOADING });

    try {
      const response = await clientServiceApi.GetSpecialist(servicioId);
      setResponse({ message: "", type: ResponseType.SUCCESS });
      setSpecialistData(response.list);
    } catch (error) {
      const message =
        (error as IErrorResponse).response?.data?.mensaje ||
        "Error desconocido";
      setResponse({ message, type: ResponseType.ERROR });
    }
  }, []);

  const fetchAvailability = useCallback(async (params: IAvailabilityParams) => {
    setResponse({ message: "Cargando datos...", type: ResponseType.LOADING });

    try {
      const response = await clientServiceApi.GetAvailability(params);
      setResponse({ message: "", type: ResponseType.SUCCESS });
      setAvailability(response);
    } catch (error) {
      const message =
        (error as IErrorResponse).response?.data?.mensaje ||
        "Error desconocido";
      setResponse({ message, type: ResponseType.ERROR });
    }
  }, []);

  const fetchGetReserves = useCallback(async (params: IReserveParams) => {
    setResponse({ message: "Cargando datos...", type: ResponseType.LOADING });

    try {
      const response = await clientServiceApi.GetReserves(params);
      setResponse({
        message: "Se creo correctamente",
        type: ResponseType.SUCCESS,
      });

      if (response.urlWhatsapp) {
        window.open(response.urlWhatsapp, "_blank");
      }
    } catch (error) {
      const message =
        (error as IErrorResponse).response?.data?.mensaje ||
        "Error desconocido";
      setResponse({ message, type: ResponseType.ERROR });
    }
  }, []);

  return {
    response,
    fetchGetAllService,
    fetchAllSpecialist,
    currentData,
    currentPage,
    totalPages,
    availability,
    goToPage,
    fetchAvailability,
    specialistData,
    fetchGetReserves,
  };
};
