import { z } from "zod";
import { provinceSchema } from "./province";

export const cityFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "نام شهر باید حداقل 2 کاراکتر باشد.",
    })
    .max(50, {
      message: "نام شهر نمی‌تواند بیشتر از 50 کاراکتر باشد.",
    }),
  provinceId: z.string({ message: "شناسه استان الزامی است." }),
});

export type cityForm = z.infer<typeof cityFormSchema>;

export const cityBaseSchema = z.object({
  publicId: z.string(),
  name: z.string(),
});

export const citySchema = cityBaseSchema.extend({
  province: provinceSchema,
});

export type City = z.infer<typeof citySchema>;
