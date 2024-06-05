import "../App.css";
import NavBar from "./Countries/navBar";
import Countries from "./Countries/Countries";
import PropTypes from "prop-types";

function HomePage({ mode, setMode }) {
  return (
    <>
      <NavBar mode={mode} setMode={setMode} />
      <main>
        <Countries mode={mode} />
      </main>
    </>
  );
}

export default HomePage;

HomePage.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};
