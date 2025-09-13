import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "نام کاربری باید ایمیل باشد." }),
  password: z.string().min(8).max(10),
});

export type Login = z.infer<typeof loginSchema>;
