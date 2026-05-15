import { AuthUseCase } from "./application/AuthUseCase";
import { UserUseCase } from "./application/UserUseCase";
import { AuthApi } from "./infraestructure/services/AuthApi";
import { UserApi } from "./infraestructure/services/UserApi";
import { MasterApi } from "./infraestructure/services/MasterApi";
import { MasterUseCase } from "./application/MasterUseCase";
import { ServiceApi } from "./infraestructure/services/ServiceApi";
import { ServiceUseCase } from "./application/ServiceUseCase";
import { API_URL } from "@/presentation/toolbox";

// Repositories
const authApi = new AuthApi({ baseURL: API_URL });
const userApi = new UserApi({ baseURL: API_URL });
const masterApi = new MasterApi({ baseURL: API_URL });
const serviceApi = new ServiceApi({ baseURL: API_URL });
// Client

export const clientUserApi = new UserUseCase(userApi);
export const clientAuthApi = new AuthUseCase(authApi);
export const clientMasterApi = new MasterUseCase(masterApi);
export const clientServiceApi = new ServiceUseCase(serviceApi);
