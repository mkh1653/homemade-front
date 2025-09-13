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
    href: "/dashboard/baseData",
    name: PATH_NAMES["/dashboard/baseData"],
  },
];
