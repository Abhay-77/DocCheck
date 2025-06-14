import HospitalCard from "@/components/HospitalCard";
import Link from "next/link";
import React from "react";
import { MdAccountCircle } from "react-icons/md";

const CustomerPage = () => {
  return (
    <section className="px-2 py-4 flex flex-wrap items-start">
      <HospitalCard />
      <HospitalCard />
      <HospitalCard />
      <HospitalCard />
      <HospitalCard />
      <HospitalCard />
      <HospitalCard />
    </section>
  );
};

export default CustomerPage;
