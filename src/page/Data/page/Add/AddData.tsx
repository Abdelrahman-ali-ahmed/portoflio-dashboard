// src/pages/AddData.tsx
import { useAdd } from "./hooks/useAdd";

const fixedCategories = [
  "Html + Css",
  "Html + js + Css",
  "React",
  "React + vite",
  "Next",

];

export default function AddData() {
  const { form, setForm, addData, loading, isDark } = useAdd();

  const inputClass = `${
    isDark
      ? `bg-black/90 text-white placeholder-gray-300 border-gray-600`
      : "bg-white text-black placeholder-gray-600 border-gray-300"
  } border p-2 rounded-md w-full`;
console.log(loading);

  return (
    <div className={`${isDark ? "bg-white text-black" : "bg-black text-white"} shadow-md rounded-xl p-4 w-full max-w-3xl mx-auto mb-6 space-y-4 border dark:border-gray-700`}>
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
          className={`${inputClass} text-right`}
        />
                <input
          type="text"
          value={form.liveLink}
          onChange={(e) =>
            setForm({
              ...form,
              liveLink: e.target.value,
            })
          }
          placeholder="Live Link"
          className={`${inputClass} col-span-2`}
        />
        
        <input
          type="text"
          value={form.src}
          onChange={(e) =>
            setForm({
              ...form,
              src: e.target.value,
            })
          }
          placeholder="Source Code"
          className={`${inputClass} col-span-2`}
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
          className={`${inputClass} col-span-2 h-24 resize-none dir-rtl`}
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
  onChange={(e) =>
    setForm({ ...form, image: e.target.files?.[0] || null })
  }
  className={`col-span-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-transparent file:text-sm file:font-semibold
    ${
      isDark
        ? "file:bg-gray-800 file:text-white hover:file:bg-white hover:file:text-black hover:file:border-gray-500"
        : "file:bg-white file:text-black hover:file:bg-black hover:file:text-white hover:file:border-gray-400"
    }`}
 />

      </div>

      <div className="flex justify-end">
        <button
          onClick={addData}
          disabled={loading}
          className={`border border-transparent font-bold ${isDark?"bg-black text-white hover:bg-white hover:text-black hover:border-black" : "bg-white text-black hover:bg-black hover:text-white hover:border-white  "}  px-6 py-2 rounded  transition`}
        >
          {loading ? "Saving..." : "Add Data"}
        </button>
      </div>
    </div>
  );
}
