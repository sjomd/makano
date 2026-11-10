import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useDarkMode } from "../context/DarkModecontext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </button>
  );
}

export default DarkModeToggle;
