import { ERole } from "@/presentation/toolbox";
import { useLoginStore } from "@/presentation/zustand";
import { CircleUser } from "lucide-react";

export const Header = () => {
  const { rol, name } = useLoginStore();

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-blue-950 px-8">
      <div className="flex flex-1 items-center gap-8">
        <h1 className="text-2xl font-bold tracking-tight text-brand-primary">
          Store
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-text-primary">{name}</p>
          <p className="text-xs text-text-muted">
            Rol:
            {rol === ERole.ROL001
              ? " Administrador"
              : rol === ERole.ROL002
                ? " Recepcionista"
                : rol === ERole.ROL003
                  ? " Especialista"
                  : " Cliente"}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary bg-bg-icon">
          <CircleUser className="h-8 w-8 text-text-secondary" />
        </div>
      </div>
    </header>
  );
};
