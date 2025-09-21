// src/components/Table.tsx
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

type TableColumn<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  hiddenOnMobile?: boolean;
};

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  emptyMessage?: string;
};

export function Table<T extends { id?: string | number }>({
  data,
  columns,
  emptyMessage = "No data available",
}: TableProps<T>) {
  const isDark = useSelector((state: RootState) => state.dark.value);

  // ✅ Unified styling
  const borderClass = isDark ? "border-gray-700" : "border-gray-300";
  const headerClass = isDark ? "bg-gray-800 text-white" : "bg-gray-200 text-black";
  const rowTextClass = isDark ? "text-white" : "text-black";

  // ✅ Hover effect (always bold, smooth transition)
  const hoverRowClass = isDark
    ? "hover:bg-white hover:text-black"
    : "hover:bg-black hover:text-white";

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table className={`w-full border-collapse border ${borderClass}`}>
        {/* Table Header */}
        <thead className={headerClass}>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`p-3 border ${borderClass} text-left font-semibold ${
                  col.hiddenOnMobile ? "hidden sm:table-cell" : ""
                } ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className={rowTextClass}>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-6 text-gray-400 italic"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id ?? Math.random()}
                className={`font-bold transition-all duration-500 ${hoverRowClass}`}
              >
                {columns.map((col, idx) => (
                  <td
                    key={idx}
                    className={`p-3 border ${borderClass} transition-all duration-500 ${
                      col.hiddenOnMobile ? "hidden sm:table-cell" : ""
                    } ${col.className || ""}`}
                  >
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
