import type { AuthRepository } from "@/core/domain/repositories/AuthRepository";
import { PublicApi } from "../api/Api";
import type { IAuthRequest, IAuthResponse } from "@/core/domain/models/Auth";

export class AuthApi extends PublicApi implements AuthRepository {
  public authUser = async (params: IAuthRequest) => {
    const response = await this.post<IAuthResponse>("/api/auth/login", params);
    return response.data;
  };
  public recoveryPassword = async (correo: string) => {
    await this.post("/api/auth/forgotPassword", { correo });
  };
}
