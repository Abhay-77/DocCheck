import React from "react";
import { Appointment } from "@/lib/definitions";

const PatientCard = async ({ patient }: { patient: Appointment }) => {
  return (
    <div className="bg-neutral-200 p-2 m-1 rounded-lg">
      <h1 className="">{patient.name}</h1>
      <h2 className="">{patient.appointment_time.toString()}</h2>
    </div>
  );
};

export default PatientCard;
