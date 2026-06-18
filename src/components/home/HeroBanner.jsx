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
    <section className="relative overflow-hidden bg-white px-6 py-16 lg:py-24">
      {/* background glow */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-200/40 blur-3xl" />
      <div className="absolute -bottom-40 right-0 h-125 w-125 rounded-full bg-rose-200/40 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
            ❤️ Every Drop Counts
          </p>

          <h1 className="mt-6 text-5xl font-black leading-tight lg:text-6xl">
            Be Someone’s{" "}
            <span className="text-red-600">Reason to Live</span>
          </h1>

          <p className="mt-5 max-w-xl text-gray-600">
            Your one donation can save up to three lives. Join our mission and
            make a difference today.
          </p>

          {/* buttons */}
          <div className="mt-8 flex gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-700"
            >
              Join as a donor
            </Link>

            <Link
              href="/search"
              className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
            >
              Search Donors
            </Link>
          </div>

          {/* STATS SECTION (ANIMATED) */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative rounded-2xl border bg-white p-4 shadow-sm"
              >
                {/* 🔴 red pulse glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-red-200/30"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />

                <div className="relative flex items-center gap-3">
                  {/* icon float animation */}
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="text-xl"
                  >
                    {item.icon}
                  </motion.div>

                  <div>
                    <h3 className="text-xl font-black">{item.value}</h3>
                    <p className="text-xs text-gray-500">{item.label}</p>
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
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-red-300/20 blur-3xl" />

          <Image
            src="/images/raktanex-hero-visual.png"
            alt="blood donation"
            width={600}
            height={600}
            className="relative w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}