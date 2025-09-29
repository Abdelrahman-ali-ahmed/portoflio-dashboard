import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import useContact from "./hooks/useContact";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import Loading from "../../component/loading";

export default function Contact() {
  const { form, handleChange, handleSave, saving, loading, isDark } = useContact();

  const info = [
    { title: "whatsapp", icon: <FaWhatsapp /> },
    { title: "linkedin", icon: <FaLinkedin /> },
    { title: "email", icon: <MdEmail /> },
    { title: "phone", icon: <FaPhoneAlt /> },
    { title: "Git Hub", icon: <FaGithub   /> },
  ];

  const containerClass = `p-6 min-h-screen duration-300 ${
    isDark ? " text-white" : " text-black"
  } bg-transparen`;

  const cardClass = `p-6 rounded-lg shadow-sm duration-300 bg-transparent`;

  const inputClass = `block w-full p-2 text-sm rounded-md border transition  focus:ring focus:ring-transparent ${
    isDark
      ? "bg-white/10 border-gray-600 text-white placeholder-gray-400"
      : "bg-white/50 border-gray-300 text-black"
  }`;

 if(loading)
 {
   return <div className="w-full h-screen flex justify-center items-center "><Loading/> </div> ;
 }

  return (
    <div className={containerClass}>
      <h1 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>Edit Contact Info</h1>

      <div className={cardClass}>
        {info.map((field, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={field.title}
              className={`block mb-2 text-sm font-medium ${
                isDark ? "text-white" : "text-black"
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
          className={`mt-4 px-4 py-2  ${ isDark ? "bg-white text-black hover:text-white" : "bg-black text-white hover:text-black"
          }  rounded hover:bg-transparent hover:border transition font-bold`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
