"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useBreadcrumbs } from "./Breadcrumbs";

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
  const links = useBreadcrumbs();

  return (
    <div>
      <div className='flex items-center justify-between mb-7'>
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
        <div className='flex gap-1'>
          <div className='avatar'>
            <div className='rounded-full w-6'>
              <Image width='100' height='100' src='/man.jpg' alt='avatar' />
            </div>
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
