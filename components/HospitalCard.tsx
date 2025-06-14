import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const HospitalCard = () => {
  return (
    <div className="bg-neutral-200 rounded-md p-4 w-[32%] min-h-20 m-1">
      <h1 className="">Hospital Name</h1>
      <h2 className="">Location</h2>
      <Link
        href={"/patient/doctors"}
        className="flex w-34 items-center gap-1 bg-gray-300 py-1 px-2 rounded hover:bg-gray-400"
      >
        View doctors
        <FaArrowRightLong />
      </Link>
    </div>
  );
};

export default HospitalCard;
