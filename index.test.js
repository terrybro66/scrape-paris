const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const { fetchData } = require("./dataFetch"); // replace with your actual module
const mock = new MockAdapter(axios);

test("fetches data correctly", async () => {
  const mockData = { data: "test" }; // replace with your actual data structure
  mock
    .onGet("https://www.citypopulation.de/en/france/cityofparis/")
    .reply(200, mockData);

  const data = await fetchData(); // replace with your actual function call
  console.log(data);
  expect(data).toEqual(mockData);
});
