import type { IDocumentResponse, IRoleResponse } from "../models/Master";

export interface MasterRepository {
  GetRol: () => Promise<IRoleResponse>;
  GetDocument: () => Promise<IDocumentResponse>;
}
