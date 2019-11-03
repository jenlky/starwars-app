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
  const homeworldWithDate = JSON.stringify(addDateToFront(homeworld.data));
  stream.write(homeworldWithDate + "\n");

  const vehicles = await Promise.all(
    person.vehicles.map(async vehicle => await axios.get(vehicle))
  );
  vehicles.map(vehicle => {
    const vehicleWithDate = JSON.stringify(addDateToFront(vehicle.data));
    stream.write(vehicleWithDate + "\n");
  });

  const starships = await Promise.all(
    person.starships.map(async starship => await axios.get(starship))
  );
  starships.map((starship, index) => {
    const starshipWithDate = addDateToFront(starship.data);
    if (index === starships.length - 1) {
      const lastStarship = JSON.stringify(addEndToFront(starshipWithDate));
      stream.write(lastStarship + "\n");
    } else {
      stream.write(JSON.stringify(starshipWithDate) + "\n");
    }
  });
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