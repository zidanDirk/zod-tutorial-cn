import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  repoName: z.string(),
  privacyLevel: z.string(),
  //              ^ 🕵️‍♂️
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("如果传入一个非法的 privacyLevel 值，则需要报错", async () => {
  expect(() =>
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "something-not-allowed",
    }),
  ).toThrowError();
});

it("应允许有效的隐私级别", async () => {
  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "private",
    }).privacyLevel,
  ).toEqual("private");

  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "public",
    }).privacyLevel,
  ).toEqual("public");
});
