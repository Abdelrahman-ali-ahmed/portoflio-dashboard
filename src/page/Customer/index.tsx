import type { CustomerType } from "../../types/types";
import { useCustomer } from "./hooks/useCustomer";

export default function Customer() {
  const {
    form,
    setForm,
    setFile,
    handleSubmit,
    handleEditSubmit,
    handleDelete,
    startEditing,
    customers,
    loading,
    editingId,
    page,
    setPage,
    paginated,
    isDark,
  } = useCustomer();

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
      <h1 className={`text-2xl font-bold mb-4 ${headerClass}`}>Customer Management</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          value={form.name.eng}
          onChange={(e) => setForm({ ...form, name: { ...form.name, eng: e.target.value } })}
          placeholder="Customer name (English)"
          className={inputClass}
        />
        <input
          type="text"
          value={form.name.ar}
          onChange={(e) => setForm({ ...form, name: { ...form.name, ar: e.target.value } })}
          placeholder="Customer name (Arabic)"
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
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {editingId ? "Update" : loading ? "Saving..." : "Add"}
        </button>
      </div>

      <h2 className={`text-xl font-semibold mb-2 ${headerClass}`}>All Customers</h2>


{customers.length === 0 ? (
  <div
    className={`border rounded p-6 text-center text-lg font-medium ${
      isDark ? "border-gray-700 text-gray-300 bg-gray-900" : "border-gray-300 text-gray-600 bg-gray-100"
    }`}
  >
    No customers found.
  </div>
) : (
  <div className="overflow-x-auto">
    <table className={`w-full border-collapse border ${tableBorderClass} text-sm`}>
      <thead className={tableHeaderClass}>
        <tr>
          <th className={`p-2 border ${tableBorderClass} text-left`}>Name (ENG)</th>
          <th className={`p-2 border ${tableBorderClass} text-left`}>Name (AR)</th>
          <th className={`p-2 border ${tableBorderClass} text-left`}>Logo</th>
          <th className={`p-2 border ${tableBorderClass} text-left`}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {paginated.map((customer: CustomerType) => (
          <tr key={customer.id} className={hoverRow}>
            <td className={`p-2 border ${tableBorderClass}`}>{customer.name.eng}</td>
            <td className={`p-2 border ${tableBorderClass}`}>{customer.name.ar}</td>
            <td className={`p-2 border ${tableBorderClass}`}>
              {customer.logo ? (
                <img src={customer.logo} alt="Logo" className="h-10" />
              ) : (
                "-"
              )}
            </td>
            <td className={`p-2 border ${tableBorderClass} space-x-2`}>
              <button
                onClick={() => startEditing(customer)}
                className="text-yellow-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(customer.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
              <button
                onClick={() => window.open(customer.logo, "_blank")}
                className="text-blue-600 underline"
              >
                View Logo
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
{customers.length === 0 ?"":(<div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() =>
            setPage((p) => (customers.length > p * 5 ? p + 1 : p))
          }
          disabled={customers.length <= page * 5}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>)}
      
    </div>
  );
}
