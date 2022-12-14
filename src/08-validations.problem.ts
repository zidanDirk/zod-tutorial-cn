import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  name: z.string(),
  //             ^ ðµï¸ââï¸
  phoneNumber: z.string().optional(),
  //                    ^ ðµï¸ââï¸
  email: z.string(),
  //              ^ ðµï¸ââï¸
  website: z.string().optional(),
  //                ^ ðµï¸ââï¸
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("å¦æçµè¯å·ç å­ç¬¦å¤ªç­ï¼åºè¯¥æ¥é", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      phoneNumber: "1",
    }),
  ).toThrowError("String must contain at least 5 character(s)");
});

it("å¦æçµè¯å·ç å­ç¬¦å¤ªé¿ï¼åºè¯¥æ¥é", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      phoneNumber: "1238712387612387612837612873612387162387",
    }),
  ).toThrowError("String must contain at most 20 character(s)");
});

it("å¦æè¾å¥éæ³çé®ç®±ï¼åºè¯¥æé", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt",
    }),
  ).toThrowError("Invalid email");
});

it("å¦æè¾å¥éæ³çç½ç« URLï¼åºè¯¥æé", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      website: "/",
    }),
  ).toThrowError("Invalid url");
});

it("å¦æè¾å¥åæ³çç½ç« URLï¼åºè¯¥éè¿æµè¯", async () => {
  expect(() =>
    validateFormInput({
      name: "Matt",
      email: "matt@example.com",
      website: "https://mattpocock.com",
    }),
  ).not.toThrowError();
});