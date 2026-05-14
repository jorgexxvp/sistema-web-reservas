import { X } from "lucide-react";
import type { FC } from "react";

interface ModalBaseProps {
  children: React.ReactNode;
  setOpen: (value: boolean) => void;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const ModalBase: FC<ModalBaseProps> = ({
  children,
  setOpen,
  className = "",
  title,
  subtitle,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-(--color-surface)/80 backdrop-blur-md transition-opacity"
        onClick={() => setOpen(false)}
      />

      <main
        className={`relative z-10 w-full max-w-md bg-(--color-surface-container-low) border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-fade-in ${className}`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-(--color-outline) hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-10 flex flex-col gap-y-6">
          {(title || subtitle) && (
            <header className="text-center space-y-2">
              {title && (
                <h1 className="text-2xl font-semibold text-(--color-on-surface) tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-sm text-(--color-on-surface-variant) max-w-70 mx-auto leading-relaxed">
                  {subtitle}
                </p>
              )}
            </header>
          )}

          <div className="text-(--color-on-surface)">{children}</div>
        </div>
      </main>
    </div>
  );
};
