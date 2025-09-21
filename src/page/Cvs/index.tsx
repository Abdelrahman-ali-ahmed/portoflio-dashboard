import Loading from "../../component/loading";
import { useCvs } from "./hooks/useLinks";
import { Table } from "../../component/Table";

export default function Cvs() {
  const {
    form,
    setForm,
    links,
    addLink,
    deleteLink,
    formatDate,
    editLink,
    updateValue,
    setEditId,
    loadingComponenet,
    startEdit,
    editId,
    loading,
    isDark,
  } = useCvs();

  const inputClass = `flex-1 p-2 border rounded focus:outline-none focus:ring transition ${
    isDark
      ? "bg-white/10 border-gray-600 text-white"
      : "bg-white/50 border-gray-300 text-black"
  }`;

  const containerClass = `p-4 min-h-screen duration-300 bg-transparent ${
    isDark ? "text-white" : "text-blue-500"
  }`;
  const headerClass = `${isDark ? "text-white" : "text-black"}`;

  const buttonClass = `px-4 py-2 rounded transition ${
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

  return (
    <div className={containerClass}>
      <h2 className={`text-2xl font-bold mb-4 ${headerClass}`}>Cvs Manager</h2>

      {/* Form */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          aria-label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className={inputClass}
        />
        <input
          type="text"
          aria-label="URL"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder="URL"
          className={inputClass}
        />
        <button
          onClick={editId ? editLink : addLink}
          disabled={loading}
          className={`${buttonClass} ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Table */}
      <h2 className={`text-xl font-semibold mb-2 ${headerClass}`}>All Cvs</h2>
      <Table
  data={links}
  columns={[
    { header: "Name", accessor: "name" },
    { header: "URL", accessor: "url", hiddenOnMobile: true },
    { header: "Created At", accessor: (row) => formatDate(row.createdAt) },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.value ? "bg-green-500 text-white" : "bg-gray-400 text-white"
          }`}
        >
          {row.value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
  header: "Actions",
  accessor: (row) => (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 w-32">
      <button
        onClick={() => updateValue(row.id!)}
        disabled={row.value || loading}
        className={`px-2 py-1 rounded text-xs ${
          row.value || loading
            ? "bg-green-300 text-white cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        Activate
      </button>
      <button
        onClick={() => {
          startEdit(row);
          setEditId(row.id!);
        }}
        disabled={loading}
        className={`px-2 py-1 rounded text-xs ${
          loading
            ? "bg-yellow-300 text-white cursor-not-allowed"
            : "bg-yellow-500 hover:bg-yellow-600 text-white"
        }`}
      >
        Edit
      </button>
      <button
        onClick={() => deleteLink(row.id!)}
        disabled={loading}
        className={`px-2 py-1 rounded text-xs ${
          loading
            ? "bg-red-300 text-white cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600 text-white"
        }`}
      >
        Delete
      </button>
      <a
        href={row.url}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 rounded text-xs bg-blue-500 hover:bg-blue-600 text-white text-center"
      >
        Visit
      </a>
    </div>
  ),
},
  ]}
/>
    </div>
  );
}
