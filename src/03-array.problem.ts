import { expect, it } from 'vitest'
import { z } from 'zod'

const StarWarsPerson = z.object({
    name: z.string(),
});

const StarWarsPeopleResults = z.unknown();
//                            ^ π΅οΈββοΈ


export const fetchStarWarsPeople = async () => {
    const data = await fetch("https://swapi.dev/api/people/").then((res) =>
      res.json(),
    );
  
    const parsedData = StarWarsPeopleResults.parse(data);
  
    // @ts-ignore
    return parsedData.results;
};

// TESTS

it("ιθ¦θΏεε§ε", async () => {
    expect((await fetchStarWarsPeople())[0]).toEqual({
      name: "Luke Skywalker",
    });
});