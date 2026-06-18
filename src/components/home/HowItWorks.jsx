"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Register as a Donor",
    description:
      "Create your donor profile with blood group, district, upazila, and contact information.",
  },
  {
    number: "02",
    title: "Create or Find Requests",
    description:
      "Request blood for a recipient or search available donors based on blood group and location.",
  },
  {
    number: "03",
    title: "Confirm Donation",
    description:
      "A donor can respond to a pending request and the request status will move to in-progress.",
  },
  {
    number: "04",
    title: "Save a Life",
    description:
      "After donation, the request can be marked as done to complete the life-saving process.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-red-50 via-white to-rose-50 px-4 py-20 dark:from-slate-950 dark:via-slate-950 dark:to-red-950/30 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-red-600 shadow-sm shadow-red-100 dark:border-red-900/60 dark:bg-slate-900 dark:text-red-400 dark:shadow-none">
            Simple Process
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            How RaktaNex
            <span className="block text-red-600">works for everyone</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            The platform keeps the donation journey simple. From registration
            to request confirmation, every step is clean, trackable, and easy to
            manage.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-red-600 via-rose-600 to-red-700 px-7 py-4 text-base font-bold text-white shadow-xl shadow-red-200 transition hover:-translate-y-0.5 hover:shadow-red-300 dark:shadow-red-950/40"
            >
              Join as a donor
            </Link>

            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-2xl border border-red-500 bg-white px-7 py-4 text-base font-bold text-red-600 transition hover:-translate-y-0.5 hover:bg-red-50 dark:bg-slate-950 dark:hover:bg-red-950/30"
            >
              Search Donors
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.1,
              }}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-[2rem] border border-red-100 bg-white p-6 shadow-sm shadow-red-100 dark:border-red-900/50 dark:bg-slate-900 dark:shadow-none"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-100 blur-2xl dark:bg-red-950/40" />

              <div className="relative">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-lg font-black text-white shadow-lg shadow-red-200 dark:shadow-red-950/40">
                  {step.number}
                </div>

                <h3 className="text-xl font-black text-slate-950 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}