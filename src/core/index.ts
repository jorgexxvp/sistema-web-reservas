import { API_URL } from "@/presentation/toolbox/constants";
import { AuthUseCase } from "./application/AuthUseCase";
import { UserUseCase } from "./application/UserUseCase";
import { AuthApi } from "./infraestructure/services/AuthApi";
import { UserApi } from "./infraestructure/services/UserApi";

// Repositories
const authApi = new AuthApi({ baseURL: API_URL });

const userApi = new UserApi({ baseURL: API_URL });

// Client
export const clientUserApi = new UserUseCase(userApi);
export const clientAuthApi = new AuthUseCase(authApi);
