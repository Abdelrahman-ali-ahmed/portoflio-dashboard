// src/pages/Data.tsx
import { Link } from "react-router-dom";
import { useData } from "./hooks/useData";

export default function Data() {
  const { dataItems, deleteData, loading, isDark } = useData();

  const containerClass = `min-h-screen p-6 duration-300 ${
    isDark ? "bg-[#0f172a] text-white" : "bg-gray-50 text-gray-900"
  }`;

  const tableBorder = isDark ? "border-gray-700" : "border-gray-300";
  const tableHead = isDark ? "bg-gray-800 text-white" : "bg-gray-200 text-black";
  const hoverRow = isDark ? "hover:bg-gray-800" : "hover:bg-gray-100";

  return (
    <div className={containerClass}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-500">Data Management</h1>
        <Link
          to="/data/add"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition shadow"
        >
          Add New
        </Link>
      </div>

      {dataItems.length === 0 ? (
        <div
          className={`rounded-lg p-6 text-center text-lg font-medium ${
            isDark
              ? "bg-gray-900 border border-gray-700 text-gray-300"
              : "bg-white border border-gray-300 text-gray-500"
          }`}
        >
          No data items found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className={`w-full text-sm border ${tableBorder}`}>
            <thead className={tableHead}>
              <tr>
                <th className={`p-3 border ${tableBorder} text-left`}>Title (EN)</th>
                <th className={`p-3 border ${tableBorder} text-left`}>Category</th>
                <th className={`p-3 border ${tableBorder} text-left`}>Image</th>
                <th className={`p-3 border ${tableBorder} text-left`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataItems.map((item) => (
                <tr key={item.id} className={`${hoverRow} border-b ${tableBorder}`}>
                  <td className={`p-3 border ${tableBorder}`}>{item.title.eng}</td>
                  <td className={`p-3 border ${tableBorder}`}>{item.category}</td>
                  <td className={`p-3 border ${tableBorder}`}>
                    <img
                      src={item.imageUrl}
                      alt="Data item"
                      className="h-12 w-12 object-cover rounded shadow-sm"
                    />
                  </td>
                  <td className={`p-3 border ${tableBorder} space-x-2`}>
                    <Link
                      to={`/data/edit/${item.id}`}
                      className="text-yellow-400 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteData(item.id, item.publicId)}
                      disabled={loading}
                      className="text-red-500 hover:underline disabled:opacity-50"
                    >
                      Delete
                    </button>
                    <a
                      href={item.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      View Image
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
