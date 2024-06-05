import "../../App.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PropTypes from "prop-types";
import { useEffect } from "react";

function NavBar({ mode, setMode }) {
  useEffect(() => {
    // Apply mode from local storage on component mount
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode);
      document.body.classList.add(storedMode);
    }
  }, [setMode]);

  function modeToggle() {
    if (mode === "light") {
      setMode("dark");
      localStorage.setItem("mode", "dark");
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else if (mode === "dark") {
      setMode("light");
      localStorage.setItem("mode", "light");
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }

  return (
    <nav className={`navBar ${mode}`}>
      <h1 className={`navHeader ${mode}`}>Where in the world?</h1>
      <div className="btnContainer">
        {mode === "light" ? (
          <DarkModeOutlinedIcon />
        ) : (
          <DarkModeIcon sx={{ color: "hsl(0, 0%, 100%)" }} />
        )}
        <button className={`navBtn ${mode}`} onClick={() => modeToggle()}>
          {mode === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;

NavBar.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};
