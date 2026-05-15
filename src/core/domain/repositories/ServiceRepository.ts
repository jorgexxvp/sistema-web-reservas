import type {
  IAvailability,
  IGetAvailability,
  IRequestReserve,
  IResponseReserve,
  IServiceList,
  ISpecialist,
} from "../models/Service";

export interface ServiceRepository {
  GetServices: () => Promise<IServiceList>;
  GetSpecialist: (id: number) => Promise<ISpecialist>;
  GetAvailability: (params: IGetAvailability) => Promise<IAvailability>;
  GetReserves: (params: IRequestReserve) => Promise<IResponseReserve>;
}
