import useSideBar from "./hooks/useSideBar";

const SideBar = () => {
  const { open, setOpen, login, Menus, location, dark } = useSideBar();

  if (!login) return null;

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } h-screen fixed top-0 left-0 p-5 pt-8 z-50 duration-300 
      ${dark ? "bg-white text-black" : "bg-black text-white"}`}
    >
      <img
        src="/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
          !open ? "rotate-180" : ""
        }`}
        onClick={setOpen}
      />

      {/* Logo + Title */}
      <div className="flex gap-x-4 items-center">
        <img
          src="/assets/logo.png"
          className={`cursor-pointer duration-500 ${open ? "rotate-[360deg]" : ""}`}
        />
        <h1
          className={`origin-left font-medium text-xl duration-200 ${
            !open ? "scale-0" : ""
          } ${dark ? "text-black" : "text-white"}`}
        >
          Hello Body
        </h1>
      </div>

      {/* Menu List */}
      <ul className="pt-6">
        {Menus.map((Menu, index) => {
          const isActive = location.pathname === `/${Menu.title.toLowerCase()}`;
          return (
            <li
              key={index}
              className={`
                flex rounded-md p-2 font-bold cursor-pointer text-sm items-center gap-x-4 transition-colors duration-200
                ${
                  dark
                    ? // Dark = true → sidebar white + black text
                      isActive
                      ? "bg-black text-white"
                      : "text-black hover:bg-black hover:text-white"
                    : // Dark = false → sidebar black + white text
                      isActive
                      ? "bg-white text-black"
                      : "text-white hover:bg-white hover:text-black"
                }
              `}
              onClick={Menu.onclick}
            >
              {open ? (
                <div className={`text-2xl`}>{Menu.icon}</div>
              ) : (
                <div className="w-full flex justify-center text-3xl">
                  {Menu.icon}
                </div>
              )}
              <span className={`${!open ? "hidden" : ""} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
