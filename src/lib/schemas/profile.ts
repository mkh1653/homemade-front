import { z } from "zod";

const profileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  nationalityCode: z.string().optional(),
  email: z.email().optional(),
  avatar: z.string().optional(),
  birthday: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Profile = z.infer<typeof profileSchema>;
