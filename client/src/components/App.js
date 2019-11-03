import React, { useState } from "react";
import "../styles/App.css";
import axios from "axios";
import SearchBar from "./SearchBar";
import Display from "./Display";

const App = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState("");

  const searchName = async name => {
    const response = await axios.get(
      `http://localhost:3001/api/people/?name=${name}`
    );
    return setData(response.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>{name}</h3>
        <SearchBar name={name} setName={setName} searchName={searchName} />
        {data && <Display data={data} />}
      </header>
    </div>
  );
};

export default App;
