import type { UserRepository } from "@/core/domain/repositories/UserRepository";
import type { ICreateRequest, IUpdateRequest } from "../domain/models/User";

export class UserUseCase {
  private repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  public async GetListUser(rolId: number) {
    return this.repo.GetListUser(rolId);
  }
  public async GetUser(userId: number) {
    return this.repo.GetUser(userId);
  }
  public async CreateUser(params: ICreateRequest) {
    return this.repo.CreateUser(params);
  }
  public async UpdateUser(params: IUpdateRequest) {
    return this.repo.UpdateUser(params);
  }
  public async DeleteUser(id: number) {
    return this.repo.DeleteUser(id);
  }
}
