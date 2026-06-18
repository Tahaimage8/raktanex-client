"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.06, rotate: -3 }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
        className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-red-900 shadow-lg shadow-red-200"
      >
        <svg
          viewBox="0 0 64 64"
          className="h-7 w-7 text-white"
          fill="currentColor"
        >
          <path d="M32 5.5C24.3 16 15 27.5 15 39.1 15 50.2 22.6 58 32 58s17-7.8 17-18.9C49 27.5 39.7 16 32 5.5Zm0 45.2c-5.7 0-10.5-4.7-10.5-11.2 0-1.2.9-2.1 2.1-2.1s2.1.9 2.1 2.1c0 4 2.8 7 6.3 7 1.2 0 2.1.9 2.1 2.1s-.9 2.1-2.1 2.1Z" />
        </svg>

        <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-red-300 ring-2 ring-white" />
      </motion.div>

      <div className="leading-none">
        <h1 className="text-[22px] font-black tracking-tight text-slate-950">
          Rakta<span className="text-red-700">Nex</span>
        </h1>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
          Blood Network
        </p>
      </div>
    </Link>
  );
};

export default Logo;