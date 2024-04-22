import { useState } from "react";
import "./App.css";
import SelectBox from "./components/SelectBox";
import Component01 from "./components/Component01";
import Component02 from "./components/Component02";
import Component03 from "./components/Component03";
import Component04 from "./components/Component04";
import Component05 from "./components/Component05";
import Component06 from "./components/Component06";

function App() {
  const [selectedOption, setSelectedOption] = useState("component01");
  return (
    <div className="App">
      <SelectBox selected={selectedOption} onSelect={setSelectedOption} />
      {selectedOption === "component01" && <Component01 />}
      {selectedOption === "component02" && <Component02 />}
      {selectedOption === "component03" && <Component03 />}
      {selectedOption === "component04" && <Component04 />}
      {selectedOption === "component05" && <Component05 />}
      {selectedOption === "component06" && <Component06 />}
    </div>
  );
}

export default App;
