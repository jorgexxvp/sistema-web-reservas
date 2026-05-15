import type { ServiceRepository } from "@/core/domain/repositories/ServiceRepository";
import { PrivateApi } from "../api/Api";
import type {
  IAvailability,
  IGetAvailability,
  IRequestReserve,
  IResponseReserve,
  IServiceList,
  ISpecialist,
} from "@/core/domain/models/Service";

export class ServiceApi extends PrivateApi implements ServiceRepository {
  public GetServices = async () => {
    const data = await this.get<IServiceList>(`/api/load`);
    return data.data;
  };
  public GetSpecialist = async (id: number) => {
    const data = await this.get<ISpecialist>(`/api/loadEspecialista`, {
      params: { servicioId: id },
    });
    return data.data;
  };

  public GetAvailability = async (params: IGetAvailability) => {
    const data = await this.post<IAvailability>(`/api/findDisponibilidad`, {
      ...params,
    });
    return data.data;
  };

  public GetReserves = async (params: IRequestReserve) => {
    const data = await this.post<IResponseReserve>(`/api/saveOrUpdateReserva`, {
      ...params,
    });
    return data.data;
  };
}
