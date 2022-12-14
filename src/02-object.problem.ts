import { expect, it } from 'vitest'
import { z } from 'zod'

const PersonResult = z.unknown()
//                   ^ π΅οΈββοΈ

export const fetchStarWarsPersonName = async (id: string) => {
    const data = await fetch("https://swapi.dev/api/people/" + id).then(res => {
        return res.json()
    })

    const parsedData = PersonResult.parse(data)
    
    // @ts-ignore
    return parsedData.name
}

// TESTS

it("ιθ¦θΏεε§ε", async () => {
    expect(await fetchStarWarsPersonName("1")).toEqual("Luke Skywalker");
    expect(await fetchStarWarsPersonName("2")).toEqual("C-3PO");
});