// REQUEST

export interface ICreateRequest {
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

export interface IUpdateRequest {
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

// RESPONSE

export interface IUserAllResponse {
  list: {
    codigo: string;
    id: number;
    nombre: string;
  }[];
}

export interface IUserGenericResponse {
  codigo: string;
  mensaje: string;
}

export interface IUserResponse {
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
