import type { FC, ReactNode } from "react";
import { Sidebar } from "../../Sidebar";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const LayoutAdmin: FC<LayoutProps> = ({ children, className }) => {
  return (
    <div
      className={`
    bg-(--color-bg-primary)
    text-(--color-text-primary)
    min-h-screen
    flex
    relative
    overflow-hidden
    ${className}
  `}
    >
      <Sidebar />

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};
