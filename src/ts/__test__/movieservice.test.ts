import { getData } from "../services/movieservice";
import { movieTestList } from "../services/__mocks__/movieservice";

jest.mock("axios", () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      if (!url.includes("error")) {
        resolve({ data: { Search: movieTestList, status: 200 } });
      } else {
        reject({ data: [], status: 500 });
      }
    });
  },
}));

test("Get data correctly", async () => {
  let result = await getData("john");

  expect(result.length).toBe(3);
  expect(result[1].Title).toBe("The Godfather");
});

test("Get data with error, return empty array", async () => {
  let result = await getData("error");

  expect(result.length).toBe(0);
});
