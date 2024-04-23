import { useState } from "react";
import "./App.css";
import SelectBox from "./components/SelectBox";
import Component01 from "./components/Component01";
import Component02 from "./components/Component02";
import Component03 from "./components/Component03";
import Component04 from "./components/Component04";
import Component05 from "./components/Component05";
import Component06 from "./components/Component06";
import Component07 from "./components/Component07";
import Component08 from "./components/Component08";
import Component09 from "./components/Component09";
import Component10 from "./components/Component10";
import Component11 from "./components/Component11";
import Component12 from "./components/Component12";

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
      {selectedOption === "component07" && <Component07 />}
      {selectedOption === "component08" && <Component08 />}
      {selectedOption === "component09" && <Component09 />}
      {selectedOption === "component10" && <Component10 />}
      {selectedOption === "component11" && <Component11 />}
      {selectedOption === "component12" && <Component12 />}
    </div>
  );
}

export default App;
