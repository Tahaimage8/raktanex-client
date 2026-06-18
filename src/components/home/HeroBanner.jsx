"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  {
    value: "10K+",
    label: "Active Donors",
    icon: "👥",
  },
  {
    value: "25K+",
    label: "Lives Saved",
    icon: "🩸",
  },
  {
    value: "100%",
    label: "Trusted Platform",
    icon: "🛡️",
  },
];

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-10 sm:px-6 lg:py-24">
      {/* background glow */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-200/40 blur-3xl" />
      <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-rose-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center lg:text-left"
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600 sm:text-sm">
            ❤️ Every Drop Counts
          </p>

          <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Be Someone’s{" "}
            <span className="block text-red-600">Reason to Live</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base lg:mx-0">
            Your one donation can save up to three lives. Join our mission and
            make a difference today.
          </p>

          {/* buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/register"
              className="rounded-xl bg-red-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-red-700"
            >
              Join as a donor
            </Link>

            <Link
              href="/search"
              className="rounded-xl border border-red-500 bg-white px-6 py-3 text-center text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Search Donors
            </Link>
          </div>

          {/* STATS SECTION */}
          <div className="mt-8 flex flex-col gap-4 lg:grid lg:grid-cols-3">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="relative w-full overflow-hidden rounded-2xl border border-red-100 bg-white p-4 shadow-sm"
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-red-200/30"
                  animate={{
                    opacity: [0.15, 0.35, 0.15],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />

                <div className="relative flex items-center justify-center gap-4 lg:justify-start">
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="text-2xl"
                  >
                    {item.icon}
                  </motion.div>

                  <div className="text-left">
                    <h3 className="text-xl font-black text-slate-950">
                      {item.value}
                    </h3>
                    <p className="text-xs font-medium text-gray-500">
                      {item.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-md lg:max-w-xl"
        >
          <div className="absolute inset-0 rounded-full bg-red-300/20 blur-3xl" />

          <Image
            src="/images/raktanex-hero-visual.png"
            alt="blood donation"
            width={600}
            height={600}
            priority
            className="relative w-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}