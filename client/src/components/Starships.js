import React from "react";

const Starships = ({ starships }) => {
  return (
    <ul>
      <h3>Starships</h3>
      {starships.map(starship => {
        return (
          <React.Fragment>
            <li key={starship.name}>Name: {starship.name}</li>
            <li key={starship.model}>Model: {starship.model}</li>
            <li key={starship.starship_class}>
              Class: {starship.starship_class}
            </li>
            <li key={starship.hyperdrive_rating}>
              Hyperdrive rating: {starship.hyperdrive_rating}
            </li>
            <li key={starship.cost_in_credits}>
              Cost in credits: {starship.cost_in_credits}
            </li>
            <li key={starship.manufacturer}>
              Manufacturer: {starship.manufacturer}
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Starships;
