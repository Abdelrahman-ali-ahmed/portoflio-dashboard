import type { LocationType } from "../../types/types";
import useLocations from "./hooks/useLocations";

export default function Location() {
   const {
    locations,
    form,
    setForm,
    handleSubmit,
    handleDelete,
    setEditId,
    editId,
    isDark,
  } = useLocations();

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
      <h1 className={`text-2xl font-bold mb-4 ${headerClass}`}>Add New Location</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className={inputClass}
        />
        <input
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="Address"
          className={inputClass}
        />
        <input
          value={form.mapLink}
          onChange={(e) => setForm({ ...form, mapLink: e.target.value })}
          placeholder="Map Link"
          className={inputClass}
        />
       <button
  onClick={handleSubmit}
  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
>
  {editId ? "Save Changes" : "Add"}
</button>
      </div>

      <h2 className={`text-xl font-semibold mb-2 ${headerClass}`}>All Locations</h2>

      <div className="overflow-x-auto">
        <table className={`w-full border-collapse border ${tableBorderClass}`}>
          <thead className={tableHeaderClass}>
            <tr>
              <th className={`p-2 border ${tableBorderClass} text-left`}>Name</th>
              <th className={`p-2 border ${tableBorderClass} text-left`}>Address</th>
              <th className={`p-2 border ${tableBorderClass} text-left`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc:LocationType) => (
              <tr key={loc.id} className={hoverRow}>
                <td className={`p-2 border ${tableBorderClass}`}>{loc.name}</td>
                <td className={`p-2 border ${tableBorderClass}`}>{loc.address}</td>
                <td className={`p-2 border ${tableBorderClass}`}>
                  <a
                    href={loc.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mr-3"
                  >
                    View Map
                  </a>
                  <button
                    onClick={() => handleDelete(loc.id)}
                    className="text-red-500 hover:underline mr-3"
                  >
                    Delete
                  </button>
                  <button
  onClick={() => {
    setForm({ name: loc.name, address: loc.address, mapLink: loc.mapLink });
    setEditId(loc.id); // 👈 this enables edit mode
  }}
  className="text-yellow-500 hover:underline mr-3"
>
  Edit
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
