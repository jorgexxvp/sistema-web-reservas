import type { MasterRepository } from "../domain/repositories/MasterRepository";

export class MasterUseCase {
  private repo: MasterRepository;

  constructor(repo: MasterRepository) {
    this.repo = repo;
  }

  public async GetDocument() {
    return this.repo.GetDocument();
  }

  public async GetRol() {
    return this.repo.GetRol();
  }
}
