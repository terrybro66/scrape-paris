const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const url = "https://www.citypopulation.de/en/france/cityofparis/";

axios.get(url).then((response) => {
  const $ = cheerio.load(response.data);
  const rows = $("tr.rname");
  const records = [];

  rows.each((i, row) => {
    // Extract the name of the arrondissement
    const nameExtended = $(row).find('span[itemprop="name"]').text();
    const splitName = nameExtended.split("Arrondissement");
    const name = splitName.length > 1 ? splitName[1].trim() : "";

    const years = $(row).find("td.rpop").get();

    years.forEach((year, j) => {
      const yearHeader = $(`th.rpop.prio${years.length - j}`).attr(
        "data-coldate"
      );
      const currentYear = new Date(yearHeader).getFullYear();

      const data = {
        Year: currentYear,
        Name: name,
        Population: $(year).text().replace(/,/g, ""),
      };
      records.push(data);
    });
  });
  const csvWriter = createCsvWriter({
    path: "./parisPop.csv",
    header: [
      { id: "Year", title: "Year" },
      { id: "Name", title: "Name" },
      { id: "Population", title: "Population" },
    ],
  });
  csvWriter
    .writeRecords(records) // returns a promise
    .then(() => {
      console.log("...Done");
    });
});
