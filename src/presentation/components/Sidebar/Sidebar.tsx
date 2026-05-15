import React, { useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  UserCog,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useSidebarStore } from "@/presentation/zustand";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  isCollapsed: boolean;
  id: string;
  onClick: (value: string) => void;
}

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { setSelected } = useSidebarStore();

  const data = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: CalendarCheck, label: "Reservas", id: "reservas" },
    { icon: UserCog, label: "Mantenimiento de Usuario", id: "usuarios" },
  ];

  return (
    <aside
      className={`
        ${isCollapsed ? "w-20" : "w-72"} 
        hidden md:flex shrink-0 flex-col gap-y-6 border-r border-blue-950 bg-bg-card 
        px-4 py-8 transition-all duration-300 ease-in-out relative
      `}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border-soft bg-bg-icon text-on-surface hover:bg-surface-bright transition-colors shadow-lg"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div
        className={`mb-4 flex items-center gap-3 px-2 ${isCollapsed ? "justify-center" : ""}`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-container transition-colors">
          <ShieldCheck size={24} className="text-on-brand-container" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap animate-in fade-in duration-500">
            <h2 className="text-xl font-semibold leading-tight text-text-primary">
              Sistema de Reservas
            </h2>
            <p className="text-xs uppercase tracking-wider text-text-muted">
              Zona Administrativa
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1">
        {data.map((item, index) => (
          <NavItem
            onClick={setSelected}
            key={index}
            isCollapsed={isCollapsed}
            icon={item.icon}
            label={item.label}
            id={item.id}
            active={item.label === "User Management"}
          />
        ))}
      </nav>
    </aside>
  );
};

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  active,
  isCollapsed,
  onClick,
  id,
}) => {
  return (
    <a
      onClick={() => {
        onClick(id);
      }}
      className={`
        flex items-center gap-3 rounded-lg py-3 transition-all group
        ${isCollapsed ? "justify-center" : "px-4"} 
        ${
          active
            ? "bg-brand-primary/10 text-brand-primary font-bold"
            : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
        }
      `}
      title={isCollapsed ? label : ""}
    >
      <Icon size={22} className={active ? "stroke-[2.5px]" : "stroke-2"} />
      {!isCollapsed && (
        <span className="text-sm whitespace-nowrap animate-in fade-in duration-300">
          {label}
        </span>
      )}
    </a>
  );
};
