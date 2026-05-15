import type {
  IGetAvailability,
  IRequestReserve,
} from "../domain/models/Service";
import type { ServiceRepository } from "../domain/repositories/ServiceRepository";

export class ServiceUseCase {
  private repo: ServiceRepository;

  constructor(repo: ServiceRepository) {
    this.repo = repo;
  }

  public async GetServices() {
    return this.repo.GetServices();
  }
  public async GetSpecialist(id: number) {
    return this.repo.GetSpecialist(id);
  }

  public async GetAvailability(params: IGetAvailability) {
    return this.repo.GetAvailability(params);
  }

  public async GetReserves(params: IRequestReserve) {
    return this.repo.GetReserves(params);
  }
}
