import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  repoName: z.string(),
  keywords: z.array(z.string()).default([]),
  
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("如果 keywords 字段有传值，则它需要被包含", async () => {
  const result = validateFormInput({
    repoName: "mattpocock",
    keywords: ["123"],
  });

  expect(result.keywords).toEqual(["123"]);
});

it("如果 keywords 字段没有传值，则需要包含空数组默认值", async () => {
  const result = validateFormInput({
    repoName: "mattpocock",
  });

  expect(result.keywords).toEqual([]);
});