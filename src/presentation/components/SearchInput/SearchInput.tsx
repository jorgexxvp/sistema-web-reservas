import { Search } from "lucide-react";
import type { FC } from "react";
import type { FieldValues } from "react-hook-form";

interface SearchInputProps {
  hookform: FieldValues;
}

export const SearchInput: FC<SearchInputProps> = ({ hookform }) => {
  return (
    <div className="relative hidden w-full max-w-md lg:block h-full">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-text-muted)"
      />

      <input
        type="text"
        placeholder="Search..."
        className={`
          w-full rounded-full py-2 pl-11 pr-4 text-sm transition-all outline-none
          border border-(--color-border-soft) 
          bg-(--color-surface-container-lowest) 
          text-(--color-on-surface)
          placeholder:text-(--color-outline)
          focus:border-(--color-primary) 
          focus:ring-2 focus:ring-(--color-primary)/10
        `}
        {...hookform.register("search")}
      />
    </div>
  );
};
