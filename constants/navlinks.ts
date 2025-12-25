import { PATH_NAMES, PathNamesKeys } from "./pathnames";

type NavLink = {
  href: PathNamesKeys;
  name: string;
};

export const navLinks = [
  {
    href: "/dashboard",
    name: PATH_NAMES["/dashboard"],
  },
  {
    href: "/dashboard/providers",
    name: PATH_NAMES["/dashboard/providers"],
  },
  {
    href: "/dashboard/settings",
    name: PATH_NAMES["/dashboard/settings"],
  },
  {
    href: "/dashboard/specialties",
    name: PATH_NAMES["/dashboard/specialties"],
  },
  {
    href: "/dashboard/province",
    name: PATH_NAMES["/dashboard/province"],
  },
  {
    href: "/dashboard/city",
    name: PATH_NAMES["/dashboard/city"],
  },
  {
    href: "/dashboard/supporters",
    name: PATH_NAMES["/dashboard/supporters"],
  },
];
