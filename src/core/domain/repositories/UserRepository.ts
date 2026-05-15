import type {
  ICreateRequest,
  IUserResponse,
  IUserAllResponse,
  IUserGenericResponse,
} from "../models/User";

export interface UserRepository {
  GetUser: (userId: number) => Promise<IUserResponse>;
  GetListUser: (rolId: number) => Promise<IUserAllResponse>;
  CreateUser: (params: ICreateRequest) => Promise<IUserGenericResponse>;
  DeleteUser: (id: number) => Promise<IUserGenericResponse>;
}
