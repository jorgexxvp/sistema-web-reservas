import { useState, useCallback } from "react";
import { clientMasterApi } from "@/core";
import type { IErrorResponse, IResponse } from "../toolbox";
import { ResponseType } from "../toolbox";

interface IDocument {
  codigo: string;
  id: number;
  nombre: string;
}

interface SelectOption {
  label: string;
  value: string;
}

export const documentAdapter = (data: IDocument[], code?: boolean) => {
  return data.map((item) => ({
    label: item.nombre,
    value: code ? item.codigo : String(item.id),
  }));
};

export const useMasterHook = () => {
  const [dataDocument, setDataDocument] = useState<SelectOption[]>([]);
  const [response, setResponse] = useState<IResponse>({
    message: "",
    type: ResponseType.INITIAL,
  });

  const fetchGetDocument = useCallback(async () => {
    setResponse({ message: "Cargando datos...", type: ResponseType.LOADING });

    try {
      const response = await clientMasterApi.GetDocument();
      setDataDocument(documentAdapter(response.list, true));
      setResponse({ message: "", type: ResponseType.SUCCESS });
    } catch (error) {
      const message =
        (error as IErrorResponse).response?.data?.mensaje ||
        "Error desconocido";
      setResponse({ message, type: ResponseType.ERROR });
    }
  }, []);

  return {
    response,
    fetchGetDocument,
    dataDocument,
  };
};
