import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    const navItems = [
      { title: "Home", link: "/" },
      { title: "About", link: "/about" },
      { title: "Login", link: "/login" },
      { title: "Account", link: "/account" },
      { title: "Doctor", link: "/doctor" },
      { title: "Patient", link: "/patient" },
    ];
  return (
    <nav className="bg-gray-300 h-14 flex items-center p-8 justify-between">
      <div className="flex gap-2">
        <Image src={"/favicon.ico"} height={20} width={30} alt="icon" />
        <h1 className="text-xl font-bold text-neutral-800">DocCheck</h1>
      </div>
      <div className="gap-6 flex text-lg">
        {navItems.map((navItem) => (
          <Link
            className="hover:underline"
            href={navItem.link}
            key={navItem.title}
          >
            {navItem.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavBar