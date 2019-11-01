const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

const fetchAndStore = async name => {
  try {
    const response = await axios.get(
      `https://swapi.co/api/people/?search=${name}`
    );

    const data = response.data.results;
    const stream = fs.createWriteStream("person.txt", { flags: "a" });

    data.forEach((person, index) => {
      if (index < 1) {
        stream.write(moment().format("Do MMMM YYYY, h:mm:ss a") + "\n");
      }
      stream.write(JSON.stringify(person) + "\n");
    });
    stream.end();
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { fetchAndStore };
