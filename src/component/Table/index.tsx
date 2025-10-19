  import React, { useState } from "react";
  import { useSelector } from "react-redux";
  import type { RootState } from "../../redux/store";
  import * as XLSX from "xlsx";
  import { saveAs } from "file-saver";
  import jsPDF from "jspdf";
  import autoTable from "jspdf-autotable";

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
    rowsPerPage?: number;
    fileName?: string; // ✅ for export filenames
  };

  export function Table<T extends { id?: string | number }>({
    data,
    columns,
    emptyMessage = "No data available",
    rowsPerPage = 5,
    fileName = "table_data",
  }: TableProps<T>) {
    const isDark = useSelector((state: RootState) => state.dark.value);
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const currentData = data.slice(startIndex, startIndex + rowsPerPage);
    const borderClass = isDark ? "border-gray-700" : "border-gray-300";
    const headerClass = isDark ? "bg-gray-800 text-white" : "bg-gray-200 text-black";
    const rowTextClass = isDark ? "text-white" : "text-black";
    const hoverRowClass = isDark
      ? "hover:bg-white hover:text-black"
      : "hover:bg-black hover:text-white";
  const exportToExcel = () => {
    const filteredColumns = columns.filter(
      (col) => col.header !== "Actions" && col.header !== "Image" && col.header !== "Status"
    );

    const exportData = data.map((row) => {
      const rowData: Record<string, any> = {};
      filteredColumns.forEach((col) => {
        const key = col.header;
        rowData[key] =
          typeof col.accessor === "function"
            ? (col.accessor(row) as string)
            : (row[col.accessor] as string);
      });
      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const filteredColumns = columns.filter(
      (col) => col.header !== "Actions" && col.header !== "Image" && col.header !== "Status"
    );

    const tableColumn = filteredColumns.map((col) => col.header);
    const tableRows = data.map((row) =>
      filteredColumns.map((col) =>
        typeof col.accessor === "function"
          ? (col.accessor(row) as string)
          : (row[col.accessor] as string)
      )
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: isDark ? [60, 60, 60] : [220, 220, 220] },
    });

    doc.save(`${fileName}.pdf`);
  };





    return (
      <div className="overflow-x-auto rounded-lg shadow-sm">
        {/* ✅ Export buttons */}
        <div className="flex justify-end items-center gap-3 mb-3 px-2">
          <button
            onClick={exportToPDF}
            className={`px-4 py-2 rounded font-semibold transition ${
              isDark
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            Export PDF
          </button>
          <button
            onClick={exportToExcel}
            className={`px-4 py-2 rounded font-semibold transition ${
              isDark
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            Export Excel
          </button>
        </div>

        {/* ✅ Table */}
        <table className={`w-full border-collapse border ${borderClass}`}>
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

          <tbody className={rowTextClass}>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-6 text-gray-400 italic"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              currentData.map((row, rowIndex) => (
                <tr
                  key={row.id ?? rowIndex}
                  className={`font-bold transition-all duration-300 ${hoverRowClass}`}
                >
                  {columns.map((col, idx) => (
                    <td
                      key={idx}
                      className={`p-3 border ${borderClass} ${
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

        {/* ✅ Pagination */}
        {totalPages > 1 && (
          <div
            className={`flex justify-center items-center gap-3 py-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1
                  ? "opacity-50 cursor-not-allowed"
                  : isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>

            <span>
              Page <strong>{page}</strong> of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded ${
                page === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
