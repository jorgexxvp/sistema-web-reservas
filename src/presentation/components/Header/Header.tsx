import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERole } from "@/presentation/toolbox";
import { useLoginStore } from "@/presentation/zustand";
import { CircleUser, LogOut } from "lucide-react";
import { ModalBase } from "@/presentation/components";

export const Header = () => {
  const { rol, name, clearAuth } = useLoginStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
    setIsModalOpen(false);
  };

  const getRolText = () => {
    switch (rol) {
      case ERole.ROL001:
        return "Administrador";
      case ERole.ROL002:
        return "Recepcionista";
      case ERole.ROL003:
        return "Especialista";
      default:
        return "Cliente";
    }
  };

  return (
    <>
      <header className="flex h-20 shrink-0 items-center justify-between border-b border-blue-950 px-8 bg-linear-to-r from-surface-container to-surface-container-low">
        <div className="flex flex-1 items-center gap-8">
          <h1 className="text-2xl font-bold tracking-tight text-brand-primary">
            Store
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-text-primary">{name}</p>
            <p className="text-xs text-text-muted">Rol: {getRolText()}</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-primary bg-linear-to-br from-brand-primary/10 to-brand-primary/5 hover:from-brand-primary/20 hover:to-brand-primary/10 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-brand-primary/20 hover:scale-110"
            title="Opciones de usuario"
          >
            <CircleUser className="h-6 w-6 text-brand-primary" />
          </button>
        </div>
      </header>

      {isModalOpen && (
        <ModalBase
          setOpen={setIsModalOpen}
          title="Cerrar Sesión"
          subtitle="¿Estás seguro de que deseas cerrar sesión?"
          className="max-w-sm"
        >
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="flex-1 px-4 py-3 rounded-lg bg-linear-to-r from-error to-error-dark text-(--color-on-error) font-semibold hover:shadow-lg hover:shadow-error/30 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <LogOut className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              Cerrar Sesión
            </button>
          </div>
        </ModalBase>
      )}
    </>
  );
};
