import { z } from "zod";

export const UserSchema = z.object({
  publicId: z.string(),
  isActive: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;
