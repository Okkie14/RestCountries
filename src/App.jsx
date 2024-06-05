import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import CountryView from "./components/CountryView";

function App() {
  const [mode, setMode] = useState("light");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage mode={mode} setMode={setMode} />} />
        <Route
          path="/:id"
          element={<CountryView mode={mode} setMode={setMode} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
