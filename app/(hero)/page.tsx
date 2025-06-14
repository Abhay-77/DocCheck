import React from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <section className="bg-neutral-100 min-h-[90vh] flex justify-evenly items-center p-8">
        <Image
          className="rounded-xl"
          src={"/image.png"}
          width={500}
          height={300}
          alt="landing_image"
        />
        <div className="text-neutral-800 w-[45%] gap-2 flex flex-col items-start">
          <h1 className="font-medium text-xl">
            Do you think checking and reserving doctor appointments are a
            hassle?
          </h1>
          <p className="text-md">
            This website makes it easy for you to manage and make appointment
            with various doctors across hospitals.It can help you save time in
            choosing doctors based on their availability and according to your
            free time.
            <br />
            Use our services now.
          </p>
          <Link href={'/login'} className="bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-700">
            Sign in
          </Link>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
