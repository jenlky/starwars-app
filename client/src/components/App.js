import React, { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import "../styles/App.css";

const App = () => {
  const [name, setName] = useState("");

  const searchName = name => {
    console.log(name);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>{name}</h3>
        <SearchBar name={name} setName={setName} searchName={searchName} />
      </header>
    </div>
  );
};

export default App;
