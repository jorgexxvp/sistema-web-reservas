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
  className = "max-w-md",
  title,
  subtitle,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6">
      <div
        className="fixed inset-0 bg-(--color-background)/80 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={() => setOpen(false)}
      />

      <main
        className={`
          relative z-10 w-full transition-all duration-300 ease-out
          bg-(--color-surface-container-low) 
          border border-white/10 rounded-xl 
          shadow-[0px_20px_50px_rgba(0,0,0,0.5)]
          max-h-[90vh] flex flex-col
          ${className}
        `}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 p-1 text-(--color-outline) hover:text-white hover:bg-white/5 rounded-full transition-all cursor-pointer z-20"
        >
          <X size={20} />
        </button>

        {(title || subtitle) && (
          <header className="p-8 pb-0 space-y-1">
            {title && (
              <h1 className="text-2xl font-semibold text-(--color-on-surface) tracking-tight font-headline-md">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-(--color-on-surface-variant) leading-relaxed">
                {subtitle}
              </p>
            )}
          </header>
        )}

        <div className="p-8 overflow-y-auto scrollbar-hide flex-1">
          <div className="text-(--color-on-surface)">{children}</div>
        </div>
      </main>
    </div>
  );
};
