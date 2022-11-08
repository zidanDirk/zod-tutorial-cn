import { expect, it } from 'vitest'
import { z } from 'zod'

const PersonResult = z.object({
    name: z.string()
})

export const fetchStarWarsPersonName = async (id: string) => {
    const data = await fetch("https://swapi.dev/api/people/" + id).then(res => {
        return res.json()
    })

    

    const parsedData = PersonResult.parse(data)
    
    console.log(parsedData)

    return parsedData.name
}

// TESTS

it("需要返回姓名", async () => {
    expect(await fetchStarWarsPersonName("1")).toEqual("Luke Skywalker");
    expect(await fetchStarWarsPersonName("2")).toEqual("C-3PO");
});