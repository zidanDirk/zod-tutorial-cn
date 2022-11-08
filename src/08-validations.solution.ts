import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  name: z.string().min(1),
  phoneNumber: z.string().min(5).max(20).optional(),
  email: z.string().email(),
  website: z.string().url().optional(),
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("如果电话号码字符太短，应该报错", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      phoneNumber: "1",
    }),
  ).toThrowError("String must contain at least 5 character(s)");
});

it("如果电话号码字符太长，应该报错", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      phoneNumber: "1238712387612387612837612873612387162387",
    }),
  ).toThrowError("String must contain at most 20 character(s)");
});

it("如果输入非法的邮箱，应该抛错", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt",
    }),
  ).toThrowError("Invalid email");
});

it("如果输入非法的网站 URL，应该抛错", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      website: "/",
    }),
  ).toThrowError("Invalid url");
});

it("如果输入合法的网站 URL，应该通过测试", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      website: "https://mattpocock.com",
    }),
  ).not.toThrowError();
});