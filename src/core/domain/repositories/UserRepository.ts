import type {
  ICreateRequest,
  IUserResponse,
  IUpdateRequest,
  IUserAllResponse,
  IUserGenericResponse,
} from "../models/User";

export interface UserRepository {
  GetUser: (userId: number) => Promise<IUserResponse>;
  GetListUser: (rolId: number) => Promise<IUserAllResponse>;
  CreateUser: (params: ICreateRequest) => Promise<IUserGenericResponse>;
  UpdateUser: (params: IUpdateRequest) => Promise<IUserGenericResponse>;
  DeleteUser: (id: number) => Promise<IUserResponse>;
}
