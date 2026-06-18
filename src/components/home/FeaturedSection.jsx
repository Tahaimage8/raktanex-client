"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Fast Blood Requests",
    description:
      "Create urgent blood requests with recipient details, location, blood group, date, and time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12 2S5 10.1 5 15.3C5 19.5 8.1 22 12 22s7-2.5 7-6.7C19 10.1 12 2 12 2Zm0 17c-2.2 0-4-1.4-4-3.8 0-.7.5-1.2 1.2-1.2s1.2.5 1.2 1.2c0 1.1.7 1.8 1.6 1.8.7 0 1.2.5 1.2 1.2S12.7 19 12 19Z" />
      </svg>
    ),
  },
  {
    title: "Search Nearby Donors",
    description:
      "Find donors by blood group, district, and upazila to get the right match quickly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M9.5 3a6.5 6.5 0 0 1 5.18 10.42l4.45 4.45a1 1 0 0 1-1.42 1.42l-4.45-4.45A6.5 6.5 0 1 1 9.5 3Zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
      </svg>
    ),
  },
  {
    title: "Clear Donation Status",
    description:
      "Track every request through pending, in-progress, done, and canceled status updates.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M9 11.75 11.25 14 15 9.75a1 1 0 0 1 1.5 1.32l-4.46 5.05a1 1 0 0 1-1.47.04l-3-3a1 1 0 0 1 1.43-1.41ZM12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    title: "Role Based Dashboard",
    description:
      "Separate dashboards for donors, volunteers, and admins with controlled permissions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M3 4a2 2 0 0 1 2-2h5v8H3V4Zm0 10h7v8H5a2 2 0 0 1-2-2v-6Zm11 8v-8h7v6a2 2 0 0 1-2 2h-5Zm7-12h-7V2h5a2 2 0 0 1 2 2v6Z" />
      </svg>
    ),
  },
];

export default function FeaturedSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-red-100/70 blur-3xl dark:bg-red-950/30" />
      <div className="absolute -right-32 bottom-16 h-80 w-80 rounded-full bg-rose-100/80 blur-3xl dark:bg-red-900/20" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-red-600 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400">
            Why RaktaNex
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Built to make blood donation
            <span className="block bg-linear-to-r from-red-600 to-rose-700 bg-clip-text text-transparent">
              faster and easier
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
            RaktaNex connects donors, recipients, volunteers, and admins in one
            clean blood donation management platform.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[2rem] border border-red-100 bg-white p-6 shadow-sm shadow-red-100 transition dark:border-red-900/50 dark:bg-slate-900 dark:shadow-none"
            >
              <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-red-100 blur-3xl transition group-hover:bg-red-200 dark:bg-red-950/30 dark:group-hover:bg-red-900/40" />

              <div className="relative">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100 dark:bg-red-950/50 dark:text-red-400 dark:ring-red-900/50"
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-xl font-black text-slate-950 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>

                <div className="mt-6 h-1 w-12 rounded-full bg-linear-to-r from-red-600 to-rose-600 transition-all duration-300 group-hover:w-20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}