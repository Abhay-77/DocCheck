import { auth } from "@/auth";
import PatientCard from "@/components/PatientCard";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import React from "react";
import { MdAccountCircle } from "react-icons/md";

const page = async () => {
  const session = await auth()
  const user = session?.user!;
  return (
    <>
      <NavD name={user.name!} />
      <section className="min-h-[90vh] p-2">
        <form action="">
          <div className="">Appointments : 0</div>
          <div className="flex gap-1 items-center">
            Are you available? No
            <Switch type="submit" /> Yes
          </div>
        </form>
        <h1 className="font-medium underline my-2">Appointments</h1>
        <div className="flex gap-1 p-4 flex-wrap">
            <PatientCard />
            <PatientCard />
            <PatientCard />
            <PatientCard />
            <PatientCard />
            <PatientCard />
        </div>
      </section>
    </>
  );
};

const NavD = ({name}:{name:string}) => {
  const customerNavItems = [
    { title: "Home", link: "/" },
    { title: "Account", link: "/account" },
  ];
  return (
    <header className="flex justify-between items-center h-16 bg-neutral-500 p-6">
      <h2 className="flex items-center gap-1 text-2xl font-semibold">
        <Link href={'/account'}>
        <MdAccountCircle size={28} color="black" />
        </Link>
        {name}
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

export default page;
