const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const { extractData } = require("./extractData");

const addDateToFront = data => {
  return Object.assign({ timestamp: moment() }, data);
};

const addEndToFront = data => {
  return Object.assign({ end: true }, data);
};

const writePersonData = async (person, stream) => {
  const personWithDate = JSON.stringify(addDateToFront(person));
  stream.write(personWithDate + "\n");

  const homeworld = await axios.get(person.homeworld);
  const vehicles = await Promise.all(
    person.vehicles.map(async vehicle => await axios.get(vehicle))
  );
  const starships = await Promise.all(
    person.starships.map(async starship => await axios.get(starship))
  );

  if (starships.length === 0 && vehicles.length === 0) {
    const homeworldWithDate = addDateToFront(homeworld.data);
    stream.write(JSON.stringify(addEndToFront(homeworldWithDate)) + "\n");

    vehicles.map(vehicle => {
      stream.write(JSON.stringify(addDateToFront(vehicle.data)) + "\n");
    });

    starships.map(starship => {
      stream.write(SON.stringify(addDateToFront(starship.data)) + "\n");
    });
  } else if (starships.length === 0) {
    stream.write(JSON.stringify(addDateToFront(homeworld.data)) + "\n");

    vehicles.map(vehicle => {
      const vehicleWithDate = addDateToFront(vehicle.data);
      if (index === starships.length - 1) {
        stream.write(JSON.stringify(addEndToFront(vehicleWithDate)) + "\n");
      } else {
        stream.write(JSON.stringify(vehicleWithDate) + "\n");
      }
    });

    starships.map(starship => {
      stream.write(JSON.stringify(addDateToFront(starship.data)) + "\n");
    });
  } else {
    stream.write(JSON.stringify(addDateToFront(homeworld.data)) + "\n");

    vehicles.map(vehicle => {
      stream.write(JSON.stringify(addDateToFront(vehicle.data)) + "\n");
    });

    starships.map((starship, index) => {
      const starshipWithDate = addDateToFront(starship.data);
      if (index === starships.length - 1) {
        stream.write(JSON.stringify(addEndToFront(starshipWithDate)) + "\n");
      } else {
        stream.write(JSON.stringify(starshipWithDate) + "\n");
      }
    });
  }

  return { homeworld, vehicles, starships };
};

const fetchAndStore = async name => {
  try {
    const response = await axios.get(
      `https://swapi.co/api/people/?search=${name}`
    );
    const people = response.data.results;
    const stream = fs.createWriteStream("person.txt", { flags: "a" });
    const extractedPeople = [];

    for (let person of people) {
      const { homeworld, vehicles, starships } = await writePersonData(
        person,
        stream
      );
      const extractedPerson = extractData(
        person,
        homeworld,
        vehicles,
        starships
      );
      extractedPeople.push(extractedPerson);
    }
    stream.end();
    return extractedPeople;
  } catch (error) {
    console.error(error);
  }
};

module.exports = fetchAndStore;
