import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  name: z.string(),
  phoneNumber: z.string().optional(),
});

export const validateFormInput = (values: unknown) => {
    const parsedData = Form.parse(values);
  
    return parsedData;
};

it("需要校验正确的输入", async () => {
    expect(() =>
      validateFormInput({
        name: "Matt",
      }),
    ).not.toThrow();
  
    expect(() =>
      validateFormInput({
        name: "Matt",
        phoneNumber: "123",
      }),
    ).not.toThrow();
});

it("当 name 字段没有值，需要报错", async () => {
    expect(() => validateFormInput({})).toThrowError("Required");
});