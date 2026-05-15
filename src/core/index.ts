import { AuthUseCase } from "./application/AuthUseCase";
import { UserUseCase } from "./application/UserUseCase";
import { AuthApi } from "./infraestructure/services/AuthApi";
import { UserApi } from "./infraestructure/services/UserApi";
import { MasterApi } from "./infraestructure/services/MasterApi";
import { MasterUseCase } from "./application/MasterUseCase";
import { ServiceApi } from "./infraestructure/services/ServiceApi";
import { ServiceUseCase } from "./application/ServiceUseCase";

// Repositories
const authApi = new AuthApi({ baseURL: "/api" });
const userApi = new UserApi({ baseURL: "/api" });
const masterApi = new MasterApi({ baseURL: "/api" });
const serviceApi = new ServiceApi({ baseURL: "/api" });
// Client

export const clientUserApi = new UserUseCase(userApi);
export const clientAuthApi = new AuthUseCase(authApi);
export const clientMasterApi = new MasterUseCase(masterApi);
export const clientServiceApi = new ServiceUseCase(serviceApi);
