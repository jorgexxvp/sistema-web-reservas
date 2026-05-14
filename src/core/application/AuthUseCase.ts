import type { IAuthRequest } from "../domain/models/Auth";
import type { AuthRepository } from "../domain/repositories/AuthRepository";

export class AuthUseCase {
  private repo: AuthRepository;

  constructor(repo: AuthRepository) {
    this.repo = repo;
  }

  public async authUser(params: IAuthRequest) {
    return this.repo.authUser(params);
  }
  public async recoveryPassword(correo: string) {
    return this.repo.recoveryPassword(correo);
  }
}
