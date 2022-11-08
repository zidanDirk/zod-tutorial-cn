import { expect, it } from 'vitest'
import { z } from 'zod'

const StarWarsPerson = z.object({
    name: z.string(),
});

const StarWarsPeopleResults = z.unknown();
//                            ^ 🕵️‍♂️


export const fetchStarWarsPeople = async () => {
    const data = await fetch("https://swapi.dev/api/people/").then((res) =>
      res.json(),
    );
  
    const parsedData = StarWarsPeopleResults.parse(data);
  
    // @ts-ignore
    return parsedData.results;
};

// TESTS

it("需要返回姓名", async () => {
    expect((await fetchStarWarsPeople())[0]).toEqual({
      name: "Luke Skywalker",
    });
});