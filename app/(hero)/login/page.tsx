'use client'

import Link from "next/link";
import React from "react";
import { useActionState } from "react";
import { authenticate } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { FaExclamation } from "react-icons/fa";

const Login = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <section className="h-[90vh] w-screen bg-neutral-200 flex items-center justify-center">
      <form
        action={formAction}
        className="bg-white w-[30%] rounded-lg p-8 gap-6 flex flex-col"
      >
        <h1 className="font-bold text-2xl">Login</h1>
        <div className="flex flex-col gap-4">
          <div className="">
            <h3 className="">Email</h3>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="w-full border rounded h-8 p-2"
            />
          </div>
          <div className="">
            <h3 className="">Password</h3>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border rounded h-8 p-2"
            />
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          type="submit"
          className="self-start bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-700"
        >
          Log in
        </button>
        {errorMessage && (
          <div className="flex gap-1">
            <FaExclamation color="red"/>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}
        <p>
          Don't have an account?
          <Link className="text-blue-600 hover:underline" href={"/signup"}>
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
