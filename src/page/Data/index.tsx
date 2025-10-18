// src/pages/Data.tsx
import { Link } from "react-router-dom";
import { useData } from "./hooks/useData";
import Loading from "../../component/loading";
import { Table } from "../../component/Table";
import SelectInput from "../../component/SelectInput";

export default function Data() {
  const {
    dataItems,
    deleteData,
    loading,
    isDark,
    loadingComponent,
    filter,
    setFilter,
    fixedCategories,
    sort,
    setSort,
  } = useData();

  const containerClass = `min-h-screen p-6 bg-transparent duration-300 ${
    isDark ? " text-white" : " text-gray-900"
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
      {/* Header section with Add button */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Data Management
        </h1>

        <Link
          to="/data/add"
          className={` ${isDark
      ? "bg-white text-black hover:bg-transparent hover:text-white "
      : "bg-black text-white hover:bg-transparent hover:text-black "} border px-4 py-2 rounded-md transition-colors duration-200 shadow-sm`}
        >
          + Add New
        </Link>
      </div>

      {/* Filter + Sort Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SelectInput
            options={fixedCategories}
            value={filter}
            onChange={(value)=>setFilter(value as "All" | "Html + Css" | "Html + js + Css" | "React" | "React + vite" | "Next")}
          />
          <SelectInput
            options={["asc", "desc"]}
            value={sort}
            onChange={(value) => setSort(value as "asc" | "desc")}
          />
        </div>
      </div>

      {/* Data Table */}
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
