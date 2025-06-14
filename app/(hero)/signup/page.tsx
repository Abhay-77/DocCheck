import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <section className="h-[90vh] w-screen bg-neutral-200 flex items-center justify-center">
      <form
        action=""
        className="bg-white w-[30%] rounded-lg p-8 gap-6 flex flex-col"
      >
        <h1 className="font-bold text-2xl">Signup</h1>
        <div className="flex flex-col gap-2">
          <div className="">
            <h3 className="">Username</h3>
            <input
              type="text"
              placeholder="Username"
              className="w-full border rounded h-8 p-2"
            />
          </div>
          <div className="">
            <h3 className="">Email</h3>
            <input
              type="text"
              placeholder="Email"
              className="w-full border rounded h-8 p-2"
            />
          </div>
          <div className="">
            <h3 className="">Password</h3>
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded h-8 p-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="self-start bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-700"
        >
          Signup
        </button>
        <p>
          Already have an account?
          <Link className="text-blue-600 hover:underline" href={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
