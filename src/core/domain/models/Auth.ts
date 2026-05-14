// REQUEST

export interface IAuthRequest {
  login: string;
  password: string;
}

// RESPONSE

export interface IAuthResponse {
  usuarioId: number;
  nombre: string;
  apellido: string;
  correo: string;
  rolCodigo: string;
  rolNombre: string;
  estadoCodigo: string;
  token: string;
}
