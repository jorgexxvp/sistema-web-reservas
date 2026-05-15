import type { MasterRepository } from "@/core/domain/repositories/MasterRepository";
import { PrivateApi } from "../api/Api";
import type {
  IDocumentResponse,
  IRoleResponse,
} from "@/core/domain/models/Master";

export class MasterApi extends PrivateApi implements MasterRepository {
  public GetDocument = async () => {
    const data = await this.get<IDocumentResponse>(
      `/api/comun/loadTipoDocumento`,
    );
    return data.data;
  };

  public GetRol = async () => {
    const data = await this.get<IRoleResponse>("/api/usuario/init");
    return data.data;
  };
}
