import { useTheme } from "../context/ThemeContext";
import { IoSunnySharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

function Navbar() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <div className="bg-slate-200 text-black dark:text-white h-[50px] font-montserrat flex justify-between items-center dark:bg-slate-900 border-b border-slate-200">
      <p>ProjectMgt</p>
      <div>
        {theme === "dark" ? (
          <button className="p-1" onClick={() => setTheme("light")}>
            <IoSunnySharp size={20} />
          </button>
        ) : (
          <button className="p-1" onClick={() => setTheme("dark")}>
            <FaMoon size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
