import React, { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import "../styles/App.css";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");

  const searchName = async name => {
    const response = await axios.get(
      `http://localhost:3001/api/people/?name=${name}`
    );
    return response;
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
