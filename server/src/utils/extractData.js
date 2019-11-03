const extractPerson = (extractedPerson, person) => {
  const { name, gender } = person;
  return {
    name,
    gender,
    ...extractedPerson
  };
};

const extractHomeworld = (extractedPerson, homeworld) => {
  const { name, population, climate } = homeworld.data;
  extractedPerson.homeworld = {
    name,
    population,
    climate
  };

  return extractedPerson;
};

const extractVehicles = (extractedPerson, vehicles) => {
  vehicles.map(vehicle => {
    const { name, model, cost_in_credits } = vehicle.data;
    extractedPerson.vehicles.push({
      name,
      model,
      cost_in_credits
    });
  });

  return extractedPerson;
};

const extractStarships = (extractedPerson, starships) => {
  starships.map(starship => {
    const {
      name,
      model,
      starship_class,
      hyperdrive_rating,
      cost_in_credits,
      manufacturer
    } = starship.data;
    extractedPerson.starships.push({
      name,
      model,
      starship_class,
      hyperdrive_rating,
      cost_in_credits,
      manufacturer
    });
  });

  return extractedPerson;
};

const extractData = (person, homeworld, vehicles, starships) => {
  let extractedPerson = extractPerson(
    {
      vehicles: [],
      starships: []
    },
    person
  );
  extractedPerson = extractHomeworld(extractedPerson, homeworld);
  extractedPerson = extractVehicles(extractedPerson, vehicles);
  return extractStarships(extractedPerson, starships);
};

module.exports = {
  extractPerson,
  extractHomeworld,
  extractVehicles,
  extractStarships,
  extractData
};
