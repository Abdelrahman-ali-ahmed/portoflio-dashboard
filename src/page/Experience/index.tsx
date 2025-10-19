import { Link } from "react-router-dom";
import Loading from "../../component/loading";
import { Table } from "../../component/Table";
import SelectInput from "../../component/SelectInput";
import useExperience from "./hooks/useExperiences";

export default function Experience() {
  const {
    experiences,
    loadingComponenet,
    handleDelete,
    navigate,
    filter,
    setFilter,
    sort,
    setSort,
    isDark,
  } = useExperience();

  const containerClass = `min-h-screen p-6 bg-transparent duration-300 ${
    isDark ? "text-white" : "text-gray-900"
  }`;

  if (loadingComponenet) {
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
          Experiences Management
        </h1>

        <button
          onClick={() => navigate("add")}
          className={`${
            isDark
              ? "bg-white text-black hover:bg-transparent hover:text-white"
              : "bg-black text-white hover:bg-transparent hover:text-black"
          } border px-4 py-2 rounded-md transition-colors duration-200 shadow-sm`}
        >
          + Add New
        </button>
      </div>

      {/* Filter + Sort Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <SelectInput
            options={["All", "Present", "Not Present"]}
            value={filter}
            onChange={(value) =>
              setFilter(value as "All" | "Present" | "Not Present")
            }
          />
          <SelectInput
            options={["asc", "desc"]}
            value={sort}
            onChange={(value) => setSort(value as "asc" | "desc")}
          />
        </div>
      </div>

      {/* Experience Table */}
      {experiences.length === 0 ? (
        <div
          className={`rounded-lg p-6 text-center text-lg font-medium ${
            isDark
              ? "bg-gray-900 border border-gray-700 text-gray-300"
              : "bg-white border border-gray-300 text-gray-500"
          }`}
        >
          No experiences found.
        </div>
      ) : (
        <Table
          data={experiences}
          fileName="Experiences"
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Field", accessor: "field" },
            { header: "Place", accessor: "place" },
            { header: "Start Date", accessor: "startDate" },
            { header: "End Date", accessor: "endDate" },
            {
              header: "Status",
              accessor: (row) => (
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    row?.isPresent
                      ? "bg-green-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {row.isPresent ? "Active" : "Inactive"}
                </span>
              ),
            },
            {
              header: "Actions",
              accessor: (row) => (
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/experience/edit/${row.id}`}
                    className="px-2 py-1 text-xs rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(row.id!)}
                    disabled={loadingComponenet}
                    className={`px-2 py-1 text-xs rounded ${
                      loadingComponenet
                        ? "bg-red-300 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                  >
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
