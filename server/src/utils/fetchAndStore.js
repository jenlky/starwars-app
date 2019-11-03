const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

const dateFormat = "Do MMMM YYYY, h:mm:ss a";

const writePersonData = async (person, stream) => {
  stream.write(JSON.stringify(person) + "\n");

  const homeworld = await axios.get(person.homeworld);
  stream.write(JSON.stringify(homeworld.data) + "\n");

  const vehicles = await Promise.all(
    person.vehicles.map(async vehicle => await axios.get(vehicle))
  );
  vehicles.map(vehicle => stream.write(JSON.stringify(vehicle.data) + "\n"));

  const starships = await Promise.all(
    person.starships.map(async starship => await axios.get(starship))
  );
  starships.map(starship => stream.write(JSON.stringify(starship.data) + "\n"));
};

const fetchAndStore = async name => {
  try {
    const response = await axios.get(
      `https://swapi.co/api/people/?search=${name}`
    );
    const people = response.data.results;
    const stream = fs.createWriteStream("person.txt", { flags: "a" });

    for (let x = 0; x < people.length; x++) {
      const person = people[x];
      if (x === 0) {
        stream.write(moment().format(dateFormat) + "\n");
      }
      await writePersonData(person, stream);
    }
    stream.end();
    return people;
  } catch (error) {
    console.error(error);
  }
};

module.exports = fetchAndStore;
