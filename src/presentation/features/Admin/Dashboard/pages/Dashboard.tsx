import { ColumnsTable, Header, Table } from "@/presentation/components";
import { useUserHook } from "@/presentation/hooks/useUserHook";
import { SquarePen } from "lucide-react";
import { useEffect, type FC } from "react";

// --- Interfaces de Tipado ---

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Offline" | "Pending";
  lastActive: string;
  avatar: string;
}

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  subtext?: string;
  type?: "default" | "success" | "warning";
  icon: string;
}

// --- Datos de Ejemplo ---

const USERS_DATA: User[] = [
  {
    id: 1,
    name: "Marcus Thorne",
    email: "m.thorne@probook.io",
    role: "Admin",
    status: "Active",
    lastActive: "Today, 10:45 AM",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8kicuVu-HTim0Rp3db8sa0rqjdhjIHmKoQGRqVojz9hatQOowtfWkOMHqbnHqouuHY_TkNdou5Z3aiCuJEGzhZ_ElyTkGLfbOjlci5SdTGLq6Bs6_GD7efE_pVHaWAYPYuA28egyH61QFCp5IBpksmeiriMYXjGAmT5tvXr8sAGbLNvUsHQ5XjhnLVy2QAs3uvUivCngp9ZIkxBEU7ZqqHXVYRzroRGuw9FMR7CfZ-KuBULpFGGok_ZskQPsJL_p_-BLlqjpXOGY4",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    email: "elena.rod@probook.io",
    role: "Receptionist",
    status: "Active",
    lastActive: "Oct 24, 2023",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoX0_o5QIwZYASpGqcpW7OwxN94z1ynDyf8FRL95D9tbW2BeUJOIBB_DxVY9t5-cUWwmbKE3IzUgulyNofL8ke4fUobA_c-Pg9RzUmy7U5TpwNKcGA1pFjyRtww6SZZPbd5wh_rWFYyQ7O1uKdFiX8oOgw3DUd-yZGkgAlZc2UsSGZbEg9TheEuscfkJeJ64Zrfvm77NipV35UpLPso9B1b9xKV4zD0Zt5kZcK6HP_GKQ1PZFK-O95WUyYAjTVaerPVOgQ1ELcs2Ke",
  },
];

// --- Componente Principal ---

export const Dashboard: FC = () => {
  const { fetchGetUser, userResponse } = useUserHook();
  console.log("fetching users...", userResponse);

  useEffect(() => {
    fetchGetUser();
  }, []);

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {/* Header */}

      <Header />

      {/* Content */}
      <section className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <StatCard
            label="Total Users"
            value="1,284"
            trend="12% up"
            icon="group"
            type="success"
          />
          <StatCard
            label="Active Now"
            value="342"
            subtext="Live sessions"
            icon="bolt"
            type="success"
          />
          <StatCard
            label="Pending"
            value="42"
            subtext="Invites sent"
            icon="hourglass_empty"
            type="warning"
          />
          <StatCard
            label="System Role"
            value="18"
            subtext="Admins"
            icon="security"
          />
        </div>

        <Table
          title={["Us665er", "Status", "Actions"]}
          data={USERS_DATA}
          render={(user) => (
            <>
              <tr
                key={user.id}
                className="hover:bg-white/2 transition-colors group"
              >
                <ColumnsTable
                  icon={
                    <img
                      src={user.avatar}
                      className="h-10 w-10 rounded-lg object-cover"
                      alt={user.name}
                    />
                  }
                  text={user.name}
                />

                <ColumnsTable
                  text={user.status}
                  icon={
                    <span
                      className={`h-2 w-2 rounded-full ${
                        user.status === "Active"
                          ? "bg-(--color-success)"
                          : "bg-(--color-text-muted)"
                      }`}
                    />
                  }
                />

                <ColumnsTable
                  icon={<SquarePen />}
                  onClick={() => {
                    console.log("abriendo");
                  }}
                />
              </tr>
            </>
          )}
        />
      </section>
    </main>
  );
};

const StatCard: FC<StatCardProps> = ({
  label,
  value,
  trend,
  subtext,
  type = "default",
  icon,
}) => {
  const getColor = () => {
    if (type === "success") return "var(--color-success)";
    if (type === "warning") return "var(--color-warning)";
    return "var(--color-text-primary)";
  };

  return (
    <div
      className="flex flex-col gap-1 rounded-xl border p-5"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-soft)",
      }}
    >
      <span
        className="text-xs font-bold uppercase tracking-wider"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </span>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold" style={{ color: getColor() }}>
          {value}
        </span>
        <span
          className="material-symbols-outlined"
          style={{ color: "var(--color-text-muted)" }}
        >
          {icon}
        </span>
      </div>
      {trend && (
        <p
          className="text-xs font-medium"
          style={{ color: "var(--color-success)" }}
        >
          {trend}
        </p>
      )}
      {subtext && (
        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          {subtext}
        </p>
      )}
    </div>
  );
};
