import type { IAuthRequest, IAuthResponse } from "../models/Auth";

export interface AuthRepository {
  authUser: (params: IAuthRequest) => Promise<IAuthResponse>;
  recoveryPassword: (correo: string) => Promise<void>;
}
