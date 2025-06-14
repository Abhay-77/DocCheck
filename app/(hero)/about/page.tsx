import React from "react";

const page = () => {
  return (
    <section className="flex justify-center bg-neutral-200">
      <section className="gap-1 bg-white w-[85%] rounded-xl px-6 py-8 my-6 flex flex-col items-center about">
        <h1>About</h1>

        <h2>Your Health, Just a Click Away</h2>
        <p>
          Welcome to <strong>DocCheck</strong>, your trusted companion in
          simplifying healthcare access. We believe that getting medical care
          should be quick, easy, and stress-free — and that’s exactly what we’re
          here to do.
        </p>

        <p>
          Our platform connects you with qualified doctors across various
          specialties and hospitals, allowing you to view real-time availability
          and book appointments instantly. No more long waits, endless phone
          calls, or confusion about scheduling. With just a few taps, you can
          find the right doctor and secure a consultation time that fits your
          schedule.
        </p>

        <h2>Why We Started</h2>
        <p>
          In a world where everything is available on demand — from groceries to
          taxis — we asked: <em>Why not healthcare?</em> We noticed that many
          patients still struggle to get timely medical attention due to
          outdated systems and poor visibility of doctor availability. That’s
          why we built this platform — to bridge the gap between patients and
          doctors through technology.
        </p>

        <h2>What We Offer</h2>
        <p>
          <strong>Real-time Doctor Availability:</strong> Instantly see which
          doctors are free and when.
        </p>
        <p>
          <strong>Smart Filters:</strong> Find the right doctor based on
          specialization, location, hospital, or symptoms.
        </p>
        <p>
          <strong>Instant Booking:</strong> Book your appointment in seconds,
          with confirmation notifications.
        </p>
        <p>
          <strong>Reliable Information:</strong> Verified profiles of doctors,
          with qualifications, experience, and reviews.
        </p>

        <h2>Our Mission</h2>
        <p>
          To make healthcare access as simple as ordering a coffee. Fast,
          transparent, and hassle-free.
        </p>

        <h2>Our Vision</h2>
        <p>
          A future where no one misses essential care due to scheduling delays
          or lack of access — where healthcare is truly at your fingertips.
        </p>
      </section>
    </section>
  );
};

export default page;
