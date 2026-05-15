import { AuthUseCase } from "./application/AuthUseCase";
import { UserUseCase } from "./application/UserUseCase";
import { AuthApi } from "./infraestructure/services/AuthApi";
import { UserApi } from "./infraestructure/services/UserApi";
import { MasterApi } from "./infraestructure/services/MasterApi";
import { MasterUseCase } from "./application/MasterUseCase";

// Repositories
const authApi = new AuthApi({ baseURL: "/api" });
const userApi = new UserApi({ baseURL: "/api" });
const masterApi = new MasterApi({ baseURL: "/api" });

// Client
export const clientUserApi = new UserUseCase(userApi);
export const clientAuthApi = new AuthUseCase(authApi);
export const clientMasterApi = new MasterUseCase(masterApi);
