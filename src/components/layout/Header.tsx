"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBreadcrumbs } from "./Breadcrumbs";
import { UserContext } from "@/app/dashboard/Providers";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const links = useBreadcrumbs();
  const profile = useContext(UserContext);

  return (
    <div>
      <div className='navbar mb-7'>
        {/* Right section */}
        <div className='breadcrumbs text-sm'>
          <ul>
            {links.map((link, index) => (
              <li key={link.href}>
                {index === links.length - 1 ? (
                  <span>{link.name}</span>
                ) : (
                  <Link href={link.href}>{link.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Left section */}
        <div className='flex grow justify-end'>
          <div className='dropdown dropdown-end'>
            <a tabIndex={0} role='button' className='cursor-pointer'>
              <div className='avatar'>
                <div className='rounded-full w-8'>
                  <Image width='100' height='100' src='/man.jpg' alt='avatar' />
                </div>
              </div>
            </a>
            <ul
              tabIndex={0}
              className='menu dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm mt-2'>
              <li>
                {profile?.user?.firstName} {profile?.user?.lastName}
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <h1 className='text-3xl font-bold text-base-content mb-9'>
        {links[links.length - 1]?.name}
      </h1>
    </div>
  );
};

export default Header;
