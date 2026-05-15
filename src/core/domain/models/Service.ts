// REQUEST

export interface IRequestReserve {
  usuarioId: number;
  fecha: string;
  observacion: string;
  invitadoNombre: string;
  invitadoApellido: string;
  invitadoTelefono: string;
  invitadoCorreo: string;
  usuarioServicioId: number;
}

export interface IGetAvailability {
  servicioId: number;
  fecha: string;
}

// RESPONSE

export interface IServiceList {
  elements: {
    categoriaId: number;
    categoriaNombre: string;
    duracion: number;
    habilitado: boolean;
    nombre: string;
    servicioId: number;
    tarifa: number;
    descripcion: string;
    tiempoTolerancia: string;
  }[];
}

export interface ISpecialist {
  list: {
    id: number;
    codigo: string;
    nombre: string;
  }[];
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

export interface IResponseReserve {
  codigoVerificacion: string;
  estadoCodigo: string;
  mensajeWhatsapp: string;
  montoAdelanto: number;
  numeroWhatsapp: string;
  reservaId: number;
  titularYape: string;
  urlWhatsapp: string;
}
