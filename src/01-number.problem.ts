import { expect, it } from 'vitest'
// import { z } from 'zod'

export const toString = (num: unknown) => {
    return String(num)
}

// TESTS

it("当入参不是数字的时候，需要抛出一个错误", () => {
    expect(() => toString("123")).toThrowError(
        "Expected number, received string",
    );
})

it("当入参是数字的时候，需要返回一个字符串", () => {
    expect(toString(1)).toBeTypeOf("string");
});