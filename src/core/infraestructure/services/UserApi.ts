import type { UserRepository } from "@/core/domain/repositories/UserRepository";

import { PrivateApi } from "../api/Api";
import type {
  ICreateRequest,
  IRoleResponse,
  IUpdateRequest,
  IUserResponse,
} from "@/core/domain/models/User";

export class UserApi extends PrivateApi implements UserRepository {
  public GetListUser = async (rolId: number) => {
    const data = await this.get<IUserResponse>(`/api/usuario/load`, {
      params: { rolId },
    });
    return data.data;
  };

  public GetUser = async (userId: number) => {
    const data = await this.get<IUserResponse>(`/api/usuario/get`, {
      params: { usuarioId: userId },
    });
    return data.data;
  };

  public GetRol = async () => {
    const data = await this.get<IRoleResponse>("/api/usuario/init");
    return data.data;
  };

  public CreateUser = async (params: ICreateRequest) => {
    const data = await this.post<IUserResponse>("/api/create-user", params);
    return data.data;
  };

  public UpdateUser = async (params: IUpdateRequest) => {
    const data = await this.put<IUserResponse>(
      `/api/update-user/${params.id}`,
      params,
    );
    return data.data;
  };
  public DeleteUser = async (id: number) => {
    const data = await this.delete<IUserResponse>(`/api/delete-user/${id}`);
    return data.data;
  };
}
