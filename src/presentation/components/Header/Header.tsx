import { ERole } from "@/presentation/toolbox";
import { useLoginStore } from "@/presentation/zustand";
import { CircleUser, Search } from "lucide-react";

export const Header = () => {
  const { rol, name } = useLoginStore();

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-blue-950 px-8">
      <div className="flex flex-1 items-center gap-8">
        <h1 className="text-2xl font-bold tracking-tight text-brand-primary">
          Store
        </h1>

        <div className="relative hidden w-full max-w-md lg:block">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full border border-border-primary bg-bg-input py-2 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-brand-primary/50"
          />
        </div>
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
