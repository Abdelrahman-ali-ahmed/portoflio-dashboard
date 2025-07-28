import useContact from "./hooks/useContact";

export default function Contact() {
  const { form, handleChange, handleSave, saving, loading, isDark } = useContact();

  const info = [
    "whatsapp",
    "linkedin",
    "email",
    "phone",
    "facebook",
    "instagram",
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <div className={`p-4 min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} duration-300`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
        Edit Contact Info
      </h1>

      <div className={`p-4 rounded ${isDark ? "bg-gray-800" : "bg-gray-100"} duration-300`}>
        {info.map((field, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={field}
              className={`block mb-2 text-sm font-medium ${isDark ? "text-white" : "text-blue-600"}`}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              name={field}
              value={form[field as keyof typeof form]}
              onChange={handleChange}
              className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 
                rounded-lg focus:ring-blue-500 focus:border-blue-500 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
