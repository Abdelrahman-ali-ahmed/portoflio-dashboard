import Loading from "../../component/loading";
import useMessage from "./hooks/useMessage";


export default function MessageLink() {
  const { form, handleChange, handleSave, saving, loading, isDark } = useMessage  ();

  const containerClass = `p-6 min-h-screen duration-300 ${isDark ? "text-white" : "text-black"} bg-transparent`;
  const cardClass = `p-6 rounded-lg shadow-sm duration-300 bg-transparent`;
  const inputClass = `block w-full p-2 text-sm rounded-md border transition focus:ring focus:ring-transparent ${
    isDark
      ? "bg-white/10 border-gray-600 text-white placeholder-gray-400"
      : "bg-white/50 border-gray-300 text-black"
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
      <h1 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>
        Edit Message link 
      </h1>

      <div className={cardClass}>
        <div className="mb-4">
          <label
            htmlFor="link"
            className={`block mb-2 text-sm font-medium ${isDark ? "text-white" : "text-black"}`}
          >
            Link
          </label>
          <input
            id="link"
            name="link"
            value={form.link}
            onChange={handleChange}
            className={inputClass}
            type="text"
            placeholder="Enter link"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className={`mt-4 px-4 py-2 border ${
            isDark
              ? "bg-white text-black hover:text-white"
              : "bg-black text-white hover:text-black"
          } rounded hover:bg-transparent  transition font-bold`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
<div className={`${cardClass} mt-8`}>
  <h2 className="text-xl font-semibold mb-4">
    Add below code in App Script in Sheet
  </h2>
<div className={`${isDark ? "bg-white text-black" : "bg-black text-white"}  p-4 rounded-md font-mono text-sm`}>
  <pre>
{`
function doPost(e) {
  try {
    var params = e && e.parameter ? e.parameter : {};
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

    // Get the last row (to calculate next ID)
    var lastRow = sheet.getLastRow();
    var newId = lastRow; // if row 1 is headers, ID starts at 1 for row 2

    sheet.appendRow([
      newId,                  // ID
      params.name || '',
      params.email || '',
      params.number || '',
      params.brandName || '',
      params.message || '',
      new Date()              // Timestamp
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        id: newId,
        received: params
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: err.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`}
  </pre>
  <button
    onClick={() => navigator.clipboard.writeText(`function myScript() { ... }`)}
    className={`mt-4 px-4 py-2 border ${
            isDark
              ? "bg-black text-white hover:border-black hover:text-black "
              : "bg-white text-black hover:border-white hover:text-white"
          } rounded hover:bg-transparent hover:border transition font-bold`}
  >
    Copy Code
  </button>
</div>
</div>
    </div>
  );
}
