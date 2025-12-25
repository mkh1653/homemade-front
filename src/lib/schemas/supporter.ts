import { z } from "zod";
import { personFormSchema, PersonSchema } from "./person";

export const supporterAuthFormSchema = z.object({
  email: z.email({ message: "ایمل معتبر وارد نمایید." }),
  password: z
    .string()
    .min(8, { message: "رمزعبور نمیتواند کمتر از 8 کاراکتر باشد." })
    .max(20, { message: "رمزعبور نمیتواند بیش از 20 کاراکتر باشد." }),
  person: personFormSchema,
});

export type supporterAuthFormData = z.infer<typeof supporterAuthFormSchema>;

export const SupporterSchema = z.object({
  publicId: z.string(),
  person: PersonSchema,
});

export type Supporter = z.infer<typeof SupporterSchema>;
