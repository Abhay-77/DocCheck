import DoctorCard from "@/components/DoctorCard";
import React from "react";

const DoctorList = () => {
  return (
    <section className="py-4 flex flex-col items-center gap-2">
      <input type="text" placeholder="Search" className="border bg-neutral-100 rounded w-1/2 h-10 p-2" />
      <section className="bg-neutral-100 rounded-lg w-2/3 m-2 p-2 flex flex-col gap-2 border-neutral-400">
      <DoctorCard />
      <DoctorCard />
      <DoctorCard />
      </section>
    </section>
  );
};

export default DoctorList;
