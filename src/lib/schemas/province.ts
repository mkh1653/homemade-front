import { z } from "zod";
// import { cityBaseSchema } from "./city";

export const provinceFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "نام استان باید حداقل 2 کاراکتر باشد.",
    })
    .max(50, {
      message: "نام استان نمی‌تواند بیشتر از 50 کاراکتر باشد.",
    }),
});

export type provinceForm = z.infer<typeof provinceFormSchema>;

const cityBaseSchema = z.object({
  publicId: z.string(),
  name: z.string(),
});

export const provinceSchema = z.object({
  publicId: z.string(),
  name: z.string(),
  cities: z.array(cityBaseSchema).default([]),
});

export type Province = z.infer<typeof provinceSchema>;
