import { Link } from "react-router-dom";
import Loading from "../../component/loading";
import { Table } from "../../component/Table";
import { useTechnology } from "./hooks/useTechnology";

export default function Technology() {
  const {
    form,
    setForm,
    setFile,
    handleSubmit,
    handleEditSubmit,
    handleDelete,
    Technologies,
    loading,
    editingId,
    isDark,
  } = useTechnology();


  const inputClass = `flex-1 p-2 border rounded focus:outline-none focus:ring transition ${
    isDark
      ? "bg-white/10 border-gray-600 text-white"
      : "bg-white/50 border-gray-300 text-black"
  }`;

  const containerClass = `p-4 min-h-screen duration-300 bg-transparent ${
    isDark ? "text-white" : "text-blue-500"
  }`;
  const headerClass = `${isDark ? "text-white" : "text-black"}`;

  const buttonClass = `px-4 py-2 rounded border transition ${
   editingId
      ? "bg-yellow-500 hover:bg-yellow-700  text-white"
      : isDark
      ? "bg-white text-black hover:bg-transparent hover:text-white hover:border"
      : "bg-black text-white hover:bg-transparent hover:text-black hover:border"
  }`;
  
  
  
    if (loading) {
      return (
        <div className="w-full h-screen flex justify-center items-center">
          <Loading />
        </div>
      );
    }

  return (
    <div className={containerClass}>
      <h1 className={`text-2xl font-bold mb-4 ${headerClass}`}>Technologies Management</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name:  e.target.value })}
          placeholder="Technology name "
          className={inputClass}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className={`${inputClass} flex-none w-48`}
        />
        <button
          onClick={editingId ? handleEditSubmit : handleSubmit}
          disabled={loading}
          className={buttonClass}
        >
          {editingId ? "Update" : loading ? "Saving..." : "Add"}
        </button>
      </div>

      <h2 className={`text-xl font-semibold mb-2 ${headerClass}`}>All Technologies</h2>
      <Table
          data={Technologies}
         
          columns={[
            { header: "Name", accessor: (row) => row.name },
            {
              header: "Image",
              accessor: (row) => (
                <img
                  src={row.logo}
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
                    onClick={() => handleDelete(row.id)}
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
                    href={row.logo}
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
</div>


  );
}
