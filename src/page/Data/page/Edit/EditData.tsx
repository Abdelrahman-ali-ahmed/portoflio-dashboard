import Loading from "../../../../component/loading";
import useEditData from "./hook/useEditData";



export default function EditData() {
 const { form, setForm, setImage,navigate , loading, handleUpdate, isDark, loadingComponent, fixedCategories } =
    useEditData();

  const inputClass = `border p-2 rounded-md w-full ${
    isDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
  }`;

 if(  loadingComponent)
 {
   return <div className="w-full h-screen flex justify-center items-center "><Loading/> </div> ;
 }

  return (
    <div
      className={`min-h-screen p-6 duration-300 ${
        isDark ? "bg-[#0f172a] text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div className="bg-white dark:bg-[#1f2937] shadow-md rounded-xl p-4 w-full max-w-3xl mx-auto mb-6 space-y-4 border dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={form.title.eng}
            onChange={(e) =>
              setForm({ ...form, title: { ...form.title, eng: e.target.value } })
            }
            placeholder="Title (English)"
            className={inputClass}
          />
          <input
            type="text"
            value={form.title.ar}
            onChange={(e) =>
              setForm({ ...form, title: { ...form.title, ar: e.target.value } })
            }
            placeholder="Title (Arabic)"
            className={inputClass}
          />

          <textarea
            value={form.content.eng}
            onChange={(e) =>
              setForm({ ...form, content: { ...form.content, eng: e.target.value } })
            }
            placeholder="Content (English)"
            className={`${inputClass} col-span-2 h-24 resize-none`}
          />
          <textarea
            value={form.content.ar}
            onChange={(e) =>
              setForm({ ...form, content: { ...form.content, ar: e.target.value } })
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
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="col-span-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Current"
              className="col-span-2 w-32 h-32 object-cover rounded shadow mx-auto"
            />
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update Data"}
          </button>
        </div>
      </div>
    </div>
  );
}
