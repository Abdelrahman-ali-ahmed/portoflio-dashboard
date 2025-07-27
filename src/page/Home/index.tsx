import useHome from "./hooks/useHome";

export default function Home() {
const {isDark, contentHome, title, handleTitleChange, handleContentChange, handleSubmit}=useHome()
  return (
    <div className={`p-4 min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
        Home Page
      </h1>

      <div className={`p-4 rounded ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
        <p>This should appear as first thing in landing page</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div>
          <label htmlFor="title-eng" className={`block mb-2 text-sm font-medium ${isDark ? "text-white" : "text-blue-600"}`}>
            Title (English)
          </label>
          <input
            id="title-eng"
            type="text"
            value={title.eng}
            onChange={(e) => handleTitleChange("eng", e.target.value)}
            className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 
              rounded-lg focus:ring-blue-500 focus:border-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter English title"
          />
        </div>
        <div>
          <label htmlFor="title-ar" className={`block mb-2 text-sm font-medium ${isDark ? "text-white" : "text-blue-600"}`}>
            Title (Arabic)
          </label>
          <input
            id="title-ar"
            type="text"
            dir="rtl"
            value={title.ar}
            onChange={(e) => handleTitleChange("ar", e.target.value)}
            className="block w-full p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 
              rounded-lg focus:ring-blue-500 focus:border-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="أدخل العنوان بالعربية"
          />
        </div>
        <div>
          <label htmlFor="message-eng" className={`block mb-2 text-sm font-medium ${isDark ? "text-white" : "text-blue-600"}`}>
            Message (English)
          </label>
          <textarea
            id="message-eng"
            rows={4}
            value={contentHome.eng}
            onChange={(e) => handleContentChange("eng", e.target.value)}
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 
              rounded-lg focus:ring-blue-500 focus:border-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your message in English"
          />
        </div>

        {/* Message Arabic */}
        <div>
          <label htmlFor="message-ar" className={`block mb-2 text-sm font-medium ${isDark ? "text-white" : "text-blue-600"}`}>
            Message (Arabic)
          </label>
          <textarea
            id="message-ar"
            dir="rtl"
            rows={4}
            value={contentHome.ar}
            onChange={(e) => handleContentChange("ar", e.target.value)}
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 
              rounded-lg focus:ring-blue-500 focus:border-blue-500 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="اكتب رسالتك بالعربية"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
