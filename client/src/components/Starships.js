import React from "react";

const Starships = ({ starships }) => {
  return (
    <ul>
      <h3>Starships</h3>
      {starships.map(starship => {
        const {
          name,
          model,
          starship_class,
          hyperdrive_rating,
          cost_in_credits,
          manufacturer
        } = starship;
        return (
          <React.Fragment>
            <li key={name}>Name: {name}</li>
            <li key={model}>Model: {model}</li>
            <li key={starship_class}>Class: {starship_class}</li>
            <li key={hyperdrive_rating}>
              Hyperdrive rating: {hyperdrive_rating}
            </li>
            <li key={cost_in_credits}>Cost in credits: {cost_in_credits}</li>
            <li key={manufacturer}>Manufacturer: {manufacturer}</li>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Starships;
