import { z } from "zod";
import { UserSchema } from "./user";

export const personFormSchema = z.object({
  firstName: z
    .string({ message: "نام باید از  حروف باشد." })
    .min(3, {
      message: "نام باید حداقل 3 کاراکتر باشد.",
    })
    .regex(/^[\u0600-\u06FF\s]+$/, { message: "نام باید فارسی باشد." }),
  lastName: z
    .string({ message: "نام خانوادگی باید از  حروف باشد." })
    .min(3, {
      message: "نام خانوادگی باید حداقل 3 کاراکتر باشد.",
    })
    .regex(/^[\u0600-\u06FF\s]+$/, {
      message: "نام خانوادگی باید فارسی باشد.",
    }),
  phone: z
    .string()
    .regex(/^(?:(?:\+98|0098)[\s-]?|0)?9\d{2}[\s-]?\d{3}[\s-]?\d{4}$/, {
      message: "شماره موبایل را به صورت صحیح وارد نمایید.",
    }),
  nationalityCode: z
    .string()
    .regex(/^[0-9]{10}$/, { message: "کد ملی معتبر وارد نمایید." })
    .or(z.literal(""))
    .optional(),
  email: z.email().optional(),
  avatar: z
    .union([z.instanceof(File), z.null()])
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 9 * 1024 * 1024;
      },
      { message: "حجم فایل نباید بیشتر از 9 مگابایت باشد." }
    )
    .refine(
      (file) => {
        if (!file) return true;

        return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        );
      },
      { message: "فقط فرمت‌های .jpg, .jpeg, .png و .webp مجاز هستند." }
    ),
  birthday: z.coerce.string<string>().optional(),
});

export const PersonSchema = z.object({
  publicId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  nationalityCode: z.string().optional(),
  email: z.email().optional(),
  birthday: z.string().optional(),
  avatar: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: UserSchema,
});

export type Person = z.infer<typeof PersonSchema>;
