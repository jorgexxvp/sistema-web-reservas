import type { FC } from "react";

interface SkeletonTableProps {
  titles: string[];
  rowsCount?: number;
}

export const SkeletonTable: FC<SkeletonTableProps> = ({
  titles,
  rowsCount = 5,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-(--color-border-soft) bg-(--color-bg-card)">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-(--color-border-soft) bg-white/2">
            {titles.map((t, index) => (
              <th
                key={index}
                className="px-6 py-4 text-xs font-bold uppercase text-(--color-text-muted)"
              >
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-(--color-border-soft)">
          {Array.from({ length: rowsCount }).map((_, rowIndex) => (
            <tr key={rowIndex} className="animate-pulse">
              {titles.map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {colIndex === 0 && (
                      <div className="h-8 w-8 rounded-lg bg-white/5 shrink-0" />
                    )}

                    <div
                      className="h-3 bg-white/5 rounded-full"
                      style={{
                        width: colIndex === titles.length - 1 ? "40px" : "100%",
                      }}
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
