import Link from "next/link";
import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { auth } from "@/auth";

const Nav = () => {
  const customerNavItems = [
    { title: "Home", link: "/" },
    { title: "Hospitals", link: "/patient" },
    { title: "Doctors", link: "/patient/doctors" },
    { title: "Account", link: "/account" },
  ];
  return (
    <header className="flex justify-between items-center h-16 bg-neutral-200 p-6">
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

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  console.log(session?.user)
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
