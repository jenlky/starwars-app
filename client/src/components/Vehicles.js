import React from "react";

const Vehicles = ({ vehicles }) => {
  return (
    <ul>
      <h3>Vehicles</h3>
      {vehicles ? (
        vehicles.map((vehicle, index) => {
          const { name, model, cost_in_credits } = vehicle;
          return (
            <React.Fragment key={index}>
              <li key={name}>Name: {name}</li>
              <li key={model}>Model: {model}</li>
              <li key={cost_in_credits}>Cost in credits: {cost_in_credits}</li>
            </React.Fragment>
          );
        })
      ) : (
        <p>-</p>
      )}
    </ul>
  );
};

export default Vehicles;
