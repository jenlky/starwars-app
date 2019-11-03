import React from "react";

const Vehicles = ({ vehicles }) => {
  return (
    <ul>
      <h3>Vehicles</h3>
      {vehicles.map(vehicle => {
        const { name, model, cost_in_credits } = vehicle;
        return (
          <React.Fragment>
            <li key={name}>Name: {name}</li>
            <li key={model}>Model: {model}</li>
            <li key={cost_in_credits}>Cost in credits: {cost_in_credits}</li>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Vehicles;
