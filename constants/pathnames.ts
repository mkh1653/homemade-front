export const PATH_NAMES: { [key: string]: string } = {
  "/dashboard": "داشبورد",
  "/dashboard/providers": "متخصصین",
  "/dashboard/providers/[providerId]": "پروفایل متخصص",
  "/dashboard/projects": "پروژه‌ها",
  "/dashboard/settings": "تنظیمات",
  "/dashboard/specialties": "مدیریت تخصص‌",
  "/dashboard/province": "مدیریت استان",
  "/dashboard/city": "مدیریت شهر",
  "/dashboard/supporters": "مدیریت پشتیبان",
  "/dashboard/supporters/create": "ساخت پشتیبان",
} as const;

export type PathNamesKeys = keyof typeof PATH_NAMES;
