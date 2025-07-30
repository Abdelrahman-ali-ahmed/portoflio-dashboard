// src/pages/AddData.tsx
import { useAdd } from "./hooks/useAdd";

const fixedCategories = [
  "Counter",
  "Chairs",
  "Complete Sets",
  "Manager's Desk",
  "Employee Desk",
  "Meeting Table",
  "Catering Table",
  "Workstation",
  "Storage Unit",
];

export default function AddData() {
  const { form, setForm, addData, loading, isDark } = useAdd();

  const inputClass = `${
    isDark
      ? "bg-gray-800 text-white border-gray-600"
      : "bg-white text-black border-gray-300"
  } border p-2 rounded-md w-full`;

  return (
    <div className="bg-white dark:bg-[#1f2937] shadow-md rounded-xl p-4 w-full max-w-3xl mx-auto mb-6 space-y-4 border dark:border-gray-700">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={form.title.eng}
          onChange={(e) =>
            setForm({
              ...form,
              title: { ...form.title, eng: e.target.value },
            })
          }
          placeholder="Title (English)"
          className={inputClass}
        />
        <input
          type="text"
          value={form.title.ar}
          onChange={(e) =>
            setForm({
              ...form,
              title: { ...form.title, ar: e.target.value },
            })
          }
          placeholder="Title (Arabic)"
          className={inputClass}
        />

        <textarea
          value={form.content.eng}
          onChange={(e) =>
            setForm({
              ...form,
              content: { ...form.content, eng: e.target.value },
            })
          }
          placeholder="Content (English)"
          className={`${inputClass} col-span-2 h-24 resize-none`}
        />
        <textarea
          value={form.content.ar}
          onChange={(e) =>
            setForm({
              ...form,
              content: { ...form.content, ar: e.target.value },
            })
          }
          placeholder="Content (Arabic)"
          className={`${inputClass} col-span-2 h-24 resize-none`}
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className={inputClass}
        >
          <option value="" disabled>
            Select Category
          </option>
          {fixedCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
          className="col-span-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={addData}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Add Data"}
        </button>
      </div>
    </div>
  );
}
