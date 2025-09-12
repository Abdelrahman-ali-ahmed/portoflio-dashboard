
import Loading from "../../component/loading/index";
import useHome from "./hooks/useHome";

export default function Home() {
const {isDark, contentHome, title, handleTitleChange, handleContentChange, handleSubmit,loading,}=useHome()
console.log(loading);

if(loading)
{
  return <div className="w-full h-screen flex justify-center items-center "><Loading/> </div> ;
}
  return (
    <div className={`p-4 min-h-screen bg-transparent ${isDark ? " text-white" : " text-black"} duration-300`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>
        Home Page
      </h1>

      <div className={`p-4 rounded bg-transparent`}>
        <p className={`${isDark ? "text-white" : "text-gray-800"}`}>This should appear as first thing in landing page</p>
      </div>

      <form onSubmit={handleSubmit} className={`space-y-6 mt-6 i${isDark ? "text-white" : "text-black"}`}>
        <div className={`${isDark ? "text-white" : "text-black"}`}>
          <label htmlFor="title-eng" className={`block mb-2 text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>
            Title (English)
          </label>
          <input
            id="title-eng"
            type="text"
            value={title.eng}
            onChange={(e) => handleTitleChange("eng", e.target.value)}
            className={`block w-full p-2 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 
              ${isDark 
                ? "bg-white/10 border-gray-600 placeholder-gray-400 text-white" 
                : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            placeholder="Enter English title"
          />
        </div>
        <div>
          <label htmlFor="title-ar" className={`block mb-2 text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>
            Title (Arabic)
          </label>
          <input
            id="title-ar"
            type="text"
            dir="rtl"
            value={title.ar}
            onChange={(e) => handleTitleChange("ar", e.target.value)}
            className={`block w-full p-2 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 
              ${isDark 
                ? "bg-white/10 border-gray-600 placeholder-gray-400 text-white" 
                : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            placeholder="أدخل العنوان بالعربية"
          />
        </div>
        <div>
          <label htmlFor="message-eng" className={`block mb-2 text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>
            Message (English)
          </label>
          <textarea
            id="message-eng"
            rows={4}
            value={contentHome.eng}
            onChange={(e) => handleContentChange("eng", e.target.value)}
            className={`block w-full p-2.5 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 
              ${isDark 
                ? "bg-white/10 border-gray-600 placeholder-gray-400 text-white" 
                : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            placeholder="Write your message in English"
          />
        </div>

        {/* Message Arabic */}
        <div>
          <label htmlFor="message-ar" className={`block mb-2 text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>
            Message (Arabic)
          </label>
          <textarea
            id="message-ar"
            dir="rtl"
            rows={4}
            value={contentHome.ar}
            onChange={(e) => handleContentChange("ar", e.target.value)}
            className={`block w-full p-2.5 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 
              ${isDark 
                ? "bg-white/10 border-gray-600 placeholder-gray-400 text-white" 
                : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            placeholder="اكتب رسالتك بالعربية"
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 rounded transition-colors duration-200 ${
            isDark 
              ? "bg-white text-black hover:bg-blue-500  font-bold " 
              : "bg-black text-white hover:bg-blue-600 font-bold"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
