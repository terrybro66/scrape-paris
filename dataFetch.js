const axios = require("axios");

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://www.citypopulation.de/en/france/cityofparis/"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { fetchData };
