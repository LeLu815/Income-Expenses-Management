import { z } from "zod";

export const postSchema = z.object({
  date: z
    .date({
      required_error: "날짜를 입력해주세요.",
      invalid_type_error: "날짜 형식을 바르게 입력해주세요.",
    })
    .length(10, {
      message: "날짜 형식을 바르게 입력해주세요.",
    }),
  category: z
    .string()
    .min(2, { message: "2자 이상 작성해주세요." })
    .max(20, { message: "20자 이하로 작성해주세요. " }),
  price: z
    .number({
      required_error: "금액을 입력해주세요.",
      invalid_type_error: "숫자를 입력해주세요.",
    })
    .positive({
      message: "금액을 입력해주세요.",
    })
    .lte(99999999999, {
      message: "거짓말치지 마세요🖕",
    })
    .finite(),
  description: z
    .string()
    .min(2, {
      message: "내용을 2자 이상 작성해주세요",
    })
    .max(40, { message: "40자 이하로 작성해주세요. " }),
});
