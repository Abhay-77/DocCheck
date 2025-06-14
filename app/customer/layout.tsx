import Link from "next/link";
import React from "react";
import { MdAccountCircle } from "react-icons/md";

export const Nav = () => {
  const customerNavItems = [
    {title:'Home',link:'/'},
    { title: "Hospitals", link: "/customer" },
    { title: "Doctors", link: "/customer/doctors" },
    { title: "Account", link: "/account" },
  ];
  return (
    <header className="flex justify-between items-center h-16 bg-neutral-500 p-6">
      <h2 className="flex items-center gap-1">
        <MdAccountCircle size={28} color="black" />
        Customer Name
      </h2>
      <div className="flex gap-4">
        {customerNavItems.map((item) => (
          <Link key={item.title} className="hover:underline" href={item.link}>
            {item.title}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
