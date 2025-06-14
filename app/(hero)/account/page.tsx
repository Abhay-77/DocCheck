import React from "react";

const AccounPage = () => {
  return (
    <>
      <section className="flex p-2">
        <div className="bg-white p-4 rounded-xl flex flex-col gap-1">
          <h1 className="font-medium text-lg">Name</h1>
          <h2 className="">Doctor | Patient</h2>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-700">
            Sign out
          </button>
        </div>
      </section>
    </>
  );
};

export default AccounPage;
