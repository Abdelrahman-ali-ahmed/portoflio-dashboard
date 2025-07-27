import useSideBar from "./hooks/useSideBar";
const SideBar = () => {
 const{open, setOpen, login,  Menus}=useSideBar()
    if (!login) return null;
  return (
  <div className={`${open ? "w-72" : "w-20"} bg-dark-purple dark:bg-gray-800 h-screen fixed top-0 left-0 p-5 pt-8 z-50 duration-300`}>
      <img
        src="/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
         border-2 rounded-full ${!open && "rotate-180"}`}
        onClick={() => setOpen()}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="/assets/logo.png"
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
            
          {open? <div className="text-3xl">{Menu.icon}</div> :<div className="w-full flex justify-center text-4xl">{Menu.icon}</div>}
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
