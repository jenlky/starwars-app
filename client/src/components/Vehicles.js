import React from "react";

const Vehicles = ({ vehicles }) => {
  return (
    <ul>
      <h3>Vehicles</h3>
      {vehicles.map(vehicle => {
        return (
          <React.Fragment>
            <li key={vehicle.name}>Name: {vehicle.name}</li>
            <li key={vehicle.model}>Model: {vehicle.model}</li>
            <li key={vehicle.cost_in_credits}>
              Cost in credits: {vehicle.cost_in_credits}
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Vehicles;
