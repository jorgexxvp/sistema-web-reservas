import type {
  ICreateRequest,
  IUserResponse,
  IUpdateRequest,
  IRoleResponse,
} from "../models/User";

export interface UserRepository {
  GetUser: (userId: number) => Promise<IUserResponse>;
  GetListUser: (rolId: number) => Promise<IUserResponse>;
  GetRol: () => Promise<IRoleResponse>;
  CreateUser: (params: ICreateRequest) => Promise<IUserResponse>;
  UpdateUser: (params: IUpdateRequest) => Promise<IUserResponse>;
  DeleteUser: (id: number) => Promise<IUserResponse>;
}
