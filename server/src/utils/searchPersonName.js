const fs = require("fs");
const moment = require("moment");
const readline = require("readline");

const searchPersonName = async personName => {
  const readInterface = readline.createInterface({
    input: fs.createReadStream("person.txt"),
    console: false
  });

  const people = [];
  let person = {};
  let hasSubstring = true;
  for await (const line of readInterface) {
    const parsedLine = JSON.parse(line);
    if (
      "height" in parsedLine &&
      parsedLine.name.toLowerCase().includes(personName)
    ) {
      hasSubstring = true;
    } else if (
      "height" in parsedLine &&
      !parsedLine.name.toLowerCase().includes(personName)
    ) {
      hasSubstring = false;
    }

    if (
      parsedLine &&
      moment().diff(parsedLine.timestamp, "days") < 7 &&
      hasSubstring
    ) {
      if ("height" in parsedLine) {
        const { name, gender } = parsedLine;
        person = {
          name,
          gender,
          ...person
        };
      } else if ("rotation_period" in parsedLine) {
        const { name, population, climate } = parsedLine;
        person.homeworld = {
          name,
          population,
          climate
        };
      } else if ("vehicle_class" in parsedLine) {
        if (!("vehicles" in person)) {
          person.vehicles = [];
        }

        const { name, model, cost_in_credits } = parsedLine;
        person.vehicles.push({
          name,
          model,
          cost_in_credits
        });
      } else if ("starship_class" in parsedLine) {
        if (!("starships" in person)) {
          person.starships = [];
        }

        const {
          name,
          model,
          starship_class,
          hyperdrive_rating,
          cost_in_credits,
          manufacturer
        } = parsedLine;
        person.starships.push({
          name,
          model,
          starship_class,
          hyperdrive_rating,
          cost_in_credits,
          manufacturer
        });
      }
    }

    if (hasSubstring && "end" in parsedLine) {
      people.push(person);
      person = {};
    }
  }
  return people;
};

module.exports = searchPersonName;
