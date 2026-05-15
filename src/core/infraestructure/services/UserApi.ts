import type { UserRepository } from "@/core/domain/repositories/UserRepository";

import { PrivateApi } from "../api/Api";
import type {
  ICreateRequest,
  IUserAllResponse,
  IUserGenericResponse,
  IUserResponse,
} from "@/core/domain/models/User";

export class UserApi extends PrivateApi implements UserRepository {
  public GetListUser = async (rolId: number) => {
    const data = await this.get<IUserAllResponse>(`/api/usuario/load`, {
      params: { rolId },
    });
    return data.data;
  };

  public GetUser = async (userId: number) => {
    const data = await this.get<IUserResponse>(`/api/usuario/get/${userId}`);
    return data.data;
  };

  public CreateUser = async (params: ICreateRequest) => {
    const data = await this.post<IUserGenericResponse>(
      "/api/usuario/saveOrUpdate",
      params,
    );
    return data.data;
  };

  public DeleteUser = async (id: number) => {
    const data = await this.delete<IUserResponse>(`/api/delete-user/${id}`);
    return data.data;
  };
}
