// src/components/Table.tsx
import React from "react";

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
  hoverRowClass?: string;
  borderClass?: string;
  headerClass?: string;
  rowTextClass?: string;
};

export function Table<T extends { id?: string | number }>({
  data,
  columns,
  emptyMessage = "No data available",
  hoverRowClass = "",
  borderClass = "",
  headerClass = "",
  rowTextClass = "",
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse border ${borderClass}`}>
        <thead className={headerClass}>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`p-2 border ${borderClass} text-left font-semibold ${
                  col.hiddenOnMobile ? "hidden sm:table-cell" : ""
                } ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={rowTextClass}>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-4 text-gray-400 italic"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id ?? Math.random()}
                className={hoverRowClass}
              >
                {columns.map((col, idx) => (
                  <td
                    key={idx}
                    className={`p-2 border ${borderClass} ${
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
