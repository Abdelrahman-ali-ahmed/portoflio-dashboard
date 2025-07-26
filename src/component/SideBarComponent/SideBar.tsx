import { useState } from "react";
import { FaHandshake, FaLocationDot } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { changeDark } from "../../redux/slices/darkSlice";
const SideBar = () => {
  const [open, setOpen] = useState(false);
   const dark = useSelector((state: RootState) => state.dark.value);
   const dispatch=useDispatch()
  const Menus = [
    { title: "home", src: "Chart_fill" },
    { title: "Accounts", src: "User",},
    { title: "Files", src: "Folder",  },
    { title: "Setting", src: "Setting" },
    { title: "Contact", src: "icon" ,icon : <IoShareSocialSharp />},
    { title: "Location", src: "icon" ,icon : <FaLocationDot />},
    { title: "customer", src: "icon" ,icon : <FaHandshake /> },
        { title: dark?"Lightmode":"Darkmode", src: "icon" ,icon : <MdOutlineDarkMode   /> ,onclick:()=>dispatch(changeDark ())},

  ];
console.log(dark);

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } bg-dark-purple dark:bg-gray-800 h-screen p-5 pt-8 relative duration-300`}
    >
      <img
        src="./src/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
         border-2 rounded-full ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/logo.png"
          className={`cursor-pointer duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Designer
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 
            hover:text-blue-500 text-gray-300 dark:text-gray-200 text-sm items-center gap-x-4 
          `}
            onClick={Menu.onclick}
          >
            
          {Menu.src!=="icon" ? <img src={`./src/assets/${Menu.src}.png`} />:open?  Menu.icon:<div className="w-full flex justify-center">{Menu.icon}</div>}
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
        
      </ul>
    </div>
  );
};
export default SideBar;
