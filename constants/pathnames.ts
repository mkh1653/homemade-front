export const PATH_NAMES: { [key: string]: string } = {
  "/dashboard": "داشبورد",
  "/dashboard/providers": "متخصصین",
  "/dashboard/providers/[providerId]": "پروفایل متخصص",
  "/dashboard/projects": "پروژه‌ها",
  "/dashboard/settings": "تنظیمات",
  "/dashboard/baseData": "اطلاعات پایه",
  "/dashboard/baseData/specialities": "مدیریت تخصص‌ها",
  "/dashboard/baseData/province": "مدیریت استان",
  "/dashboard/baseData/city": "مدیریت شهر",
} as const;

export type PathNamesKeys = keyof typeof PATH_NAMES;
