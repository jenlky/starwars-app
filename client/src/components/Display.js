import React from "react";
import Vehicles from "./Vehicles";
import Starships from "./Starships";

const Display = ({ data }) => {
  return data.map((person, index) => {
    const { name, gender, homeworld, vehicles, starships } = person;
    return (
      <div className="display" key={index}>
        <p>Name: {name}</p>
        <p>Gender: {gender}</p>
        <ul>
          <h3>Homeworld</h3>
          <li key={homeworld.name}>Name: {homeworld.name}</li>
          <li key={homeworld.population}>Population: {homeworld.population}</li>
          <li key={homeworld.climate}>Climate: {homeworld.climate}</li>
        </ul>
        <Vehicles vehicles={vehicles} />
        <Starships starships={starships} />
      </div>
    );
  });
};

export default Display;
