"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/navlinks";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className='bg-base-300 text-base-content w-64 p-4 min-h-screen shadow-md'>
      <div className='flex items-center mt-6 mb-3'>
        <h1 className='text-2xl text-center font-bold w-full'>Homemade</h1>
      </div>
      <div className='divider'></div>
      <ul className='menu w-full gap-2 text-sm'>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`flex items-center space-x-2 p-2 rounded-xl font-medium ${
                  isActive ? "bg-accent text-accent-content" : ""
                }`}>
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
