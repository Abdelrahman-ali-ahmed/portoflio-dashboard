
import { useLinks } from "./hooks/useLinks";
export default function Files() {
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
    startEdit,
    editId,
    loading,
    isDark,
  } = useLinks();

  const baseInputClass =
    "flex-1 p-2 border rounded focus:outline-none focus:ring transition";
  const inputClass = `${baseInputClass} ${
    isDark ? "bg-[#1f2937] border-gray-600 text-white" : "bg-white border-gray-300 text-black"
  }`;

  const containerClass = `p-4 min-h-screen duration-300 ${
    isDark ? "bg-[#111827] text-white" : "bg-white text-blue-500"
  }`;

  const headerClass = `${isDark ? "text-blue-400" : "text-blue-600"}`;
  const tableHeaderClass = `${isDark ? "bg-gray-800" : "bg-gray-200"}`;
  const tableBorderClass = `${isDark ? "border-gray-700" : "border-gray-300"}`;
  const hoverRow = `${isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"}`;

  return (
    <div className={containerClass}>
      <h2 className={`text-2xl font-bold mb-4 ${headerClass}`}>Link Manager</h2>

      {/* Form */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className={inputClass}
        />
        <input
          type="text"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder="URL"
          className={inputClass}
        />
        <button
          onClick={editId ? editLink : addLink}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            editId ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
          } transition`}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Table */}
      <h2 className={`text-xl font-semibold mb-2 ${headerClass}`}>All Links</h2>
      <div className="overflow-x-auto">
        <table className={`w-full border-collapse border ${tableBorderClass}`}>
          <thead className={tableHeaderClass}>
            <tr>
              <th className={`p-2 border ${tableBorderClass} text-left`}>Name</th>
              <th className={`p-2 border ${tableBorderClass} text-left`}>URL</th>
              <th className={`p-2 border ${tableBorderClass} text-left`}>Created At</th>
              <th className={`p-2 border ${tableBorderClass} text-left`}>Status</th>
              <th className={`p-2 border ${tableBorderClass} text-left`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id} className={hoverRow}>
                <td className={`p-2 border ${tableBorderClass}`}>{link.name}</td>
                <td className={`p-2 border ${tableBorderClass}`}>{link.url}</td>
                <td className={`p-2 border ${tableBorderClass}`}>{formatDate(link.createdAt)}</td>
                <td className={`p-2 border ${tableBorderClass}`}>{link.value ? "Active" : "Inactive"}</td>
                <td className={`p-2 border ${tableBorderClass} space-x-2`}>
                  <button
                    onClick={() => updateValue(link.id!)}
                    disabled={link.value}
                    className="text-green-500 hover:underline"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => {
                      startEdit(link);
                      setEditId(link.id!);
                    }}
                    className="text-yellow-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteLink(link.id!)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
