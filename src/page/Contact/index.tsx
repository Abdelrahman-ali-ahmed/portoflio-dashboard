import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import useContact from "./hooks/useContact";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  const { form, handleChange, handleSave, saving, loading, isDark } = useContact();

  const info = [
    { title: "whatsapp", icon: <FaWhatsapp /> },
    { title: "linkedin", icon: <FaLinkedin /> },
    { title: "email", icon: <MdEmail /> },
    { title: "phone", icon: <FaPhoneAlt /> },
    { title: "facebook", icon: <FaFacebook /> },
    { title: "instagram", icon: <FaInstagram /> },
  ];

  const containerClass = `p-6 min-h-screen duration-300 ${
    isDark ? "bg-[#0f172a] text-white" : "bg-gray-50 text-gray-900"
  }`;

  const cardClass = `p-6 rounded-lg shadow-sm duration-300 ${
    isDark ? "bg-gray-800" : "bg-white"
  }`;

  const inputClass = `block w-full p-2 text-sm rounded-md border transition focus:outline-none focus:ring focus:ring-blue-500 ${
    isDark
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      : "bg-gray-50 border-gray-300 text-black"
  }`;

  if (loading) return <p className="p-6 text-lg">Loading...</p>;

  return (
    <div className={containerClass}>
      <h1 className="text-3xl font-bold mb-6 text-blue-500">Edit Contact Info</h1>

      <div className={cardClass}>
        {info.map((field, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={field.title}
              className={`block mb-2 text-sm font-medium ${
                isDark ? "text-white" : "text-blue-600"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {field.icon}
                {field.title.charAt(0).toUpperCase() + field.title.slice(1)}
              </span>
            </label>
            <input
              id={field.title}
              name={field.title}
              value={form[field.title as keyof typeof form]}
              onChange={handleChange}
              className={inputClass}
              type="text"
              placeholder={`Enter ${field.title}`}
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
