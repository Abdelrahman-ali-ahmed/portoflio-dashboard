import { Link } from "react-router-dom";
import Loading from "../../component/loading";
import { Table } from "../../component/Table";
import useExperience from "./hooks/useExperiences";

export default function Experience() {
   const {
    experiences,
    loadingComponenet,
    handleDelete,
    navigate,
    editId,
    isDark,
  } = useExperience ();

  const containerClass = `p-4 min-h-screen duration-300 bg-transparent ${
    isDark ? "text-white" : "text-blue-500"
  }`;
  const headerClass = `${isDark ? "text-white" : "text-black"}`;

  const buttonClass = `px-4 py-2 rounded transition font-bold  w-[30%] md:w-[15%] ${
    editId
      ? "bg-yellow-500 hover:bg-yellow-700 text-white"
      : isDark
      ? "bg-white text-black hover:bg-transparent hover:text-white hover:border"
      : "bg-black text-white hover:bg-transparent hover:text-black hover:border"
  }`;

  if (loadingComponenet) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  console.log(experiences);
  

  return (
    <div className={containerClass}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h1 className={`text-2xl font-bold mb-4 ${headerClass } `}>Add New Experience</h1>

      <button
        onClick={() => navigate("add")}
        className={buttonClass}
      >
        Add
      </button> </div>


      <h2 className={`text-xl font-semibold mb-2 ${headerClass}`}>All Experience</h2>

      <div className="overflow-x-auto">
    <Table
  data={experiences}
  columns={[
    { header: "Name", accessor: "name" },
    { header: "Field", accessor: "field" }, // ✅ fixed typo
    { header: "Place", accessor: "place" },
        { header: "Start Date", accessor: "startDate" },
        { header: "End Date", accessor: "endDate" },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row?.isPresent ? "bg-green-500 text-white" : "bg-gray-400 text-white"
          }`}
        >
          {row.isPresent ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="grid grid-cols-2  gap-2 w-32">
    <Link
                    to={`/experience/edit/${row.id}`}
                    className="flex justify-center px-2 py-1 text-xs rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    Edit
                  </Link>
          <button
            onClick={() => handleDelete(row.id!)} // ✅ delete
            disabled={loadingComponenet}
            className={`px-2 py-1 rounded text-xs ${
              loadingComponenet
                ? "bg-red-300 text-white cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            Delete
          </button>
        </div>
      ),
    },
  ]}
/>
      </div>
    </div>
  );
}
