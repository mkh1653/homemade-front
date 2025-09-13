import { z } from 'zod';

export const specialtyFormSchema = z.object({
  name: z.string().min(3, {
    message: "نام تخصص باید حداقل 3 کاراکتر باشد."
  }).max(50, {
    message: "نام تخصص نمی‌تواند بیشتر از 50 کاراکتر باشد."
  }),
  description: z.string().min(10, {
    message: "توضیحات باید حداقل 10 کاراکتر باشد."
  }).max(255, {
    message: "توضیحات نمی‌تواند بیشتر از 255 کاراکتر باشد."
  }),
  icon: z.string().optional()
});

export type SpecialtyFormData = z.infer<typeof specialtyFormSchema>;

export const specialtySchema = z.object({
  publicId: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  isActive: z.boolean(),
  createdAt: z.string().optional(), 
  updatedAt: z.string().optional(),
});

export type Specialty = z.infer<typeof specialtySchema>;