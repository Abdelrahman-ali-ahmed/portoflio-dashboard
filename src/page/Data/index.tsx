// src/pages/Data.tsx
import { Link } from "react-router-dom";
import { useData } from "./hooks/useData";
import Loading from "../../component/loading";
import { Table } from "../../component/Table";

export default function Data() {
  const { dataItems, deleteData, loading, isDark, loadingComponent } = useData();

  const containerClass = `min-h-screen p-6 duration-300 ${
    isDark ? "bg-transparent text-white" : "bg-gray-50 text-gray-900"
  }`;



  if (loadingComponent) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${isDark?"text-white" : "text-black"}`}>Data Management</h1>
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
        <Table
          data={dataItems}
         
          columns={[
            { header: "Title (EN)", accessor: (row) => row.title.eng },
            { header: "Category", accessor: (row) => row.category },
            {
              header: "Image",
              accessor: (row) => (
                <img
                  src={row.imageUrl}
                  alt="Data item"
                  className="h-12 w-12 object-cover rounded shadow-sm"
                />
              ),
            },
            {
              header: "Actions",
              accessor: (row) => (
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/data/edit/${row.id}`}
                    className="px-2 py-1 text-xs rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteData(row.id, row.publicId)}
                    disabled={loading}
                    className={`px-2 py-1 text-xs rounded ${
                      loading
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                  >
                    Delete
                  </button>
                  <a
                    href={row.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 text-xs rounded bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    View
                  </a>
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
