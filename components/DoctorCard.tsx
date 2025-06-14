import React from "react";

const DoctorCard = () => {
  return (
    <div className="flex justify-between items-center p-2 rounded bg-white">
      <h1 className="">Doctor Name</h1>
      <h1 className="">Hospital Name</h1>
        <button className="bg-neutral-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-neutral-600">
          Appoint
        </button>
    </div>
  );
};

export default DoctorCard;
