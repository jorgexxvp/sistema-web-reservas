// REQUEST

export interface ICreateRequest {
  name: string;
  description: string;
  email: string;
  phone: string;
  accountId: number;
}

export interface IUpdateRequest {
  id: number;
  name: string;
  description: string;
  email: string;
  phone: string;
}

// RESPONSE

export interface IUserResponse {
  list: {
    codigo: string;
    id: number;
    nombre: string;
  }[];
}

export interface IRoleResponse {
  list: {
    codigo: string;
    id: number;
    nombre: string;
  }[];
}
