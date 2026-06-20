"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { authClient } from "@/lib/auth-client";

const REDIRECT_SECONDS = 5;

const UnauthorizedPage = () => {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    // tick the countdown every second
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // sign the user out and redirect once the countdown ends
    const timer = setTimeout(async () => {
      await authClient.signOut();
      router.push("/login");
    }, REDIRECT_SECONDS * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  const progressPercent = (secondsLeft / REDIRECT_SECONDS) * 100;

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-linear-to-b from-black via-[#0a0a0a] to-black px-6 text-white">
      {/* background glow */}
      <div className="absolute h-100 w-100 rounded-full bg-red-500/20 blur-[120px]" />

      {/* card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-2xl font-bold text-red-400"
        >
          !
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-2xl font-semibold tracking-tight"
        >
          Access Restricted
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-3 text-sm leading-6 text-white/60"
        >
          You don&apos;t have permission to access this area.
          <br />
          Auto logout for security protection.
        </motion.p>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm">
          <span className="text-white/50">Redirecting in</span>
          <span className="text-lg font-semibold text-red-400">
            {secondsLeft}
          </span>
          <span className="text-white/50">seconds</span>
        </div>

        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-red-400"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1 }}
          />
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full rounded-xl bg-white py-3 font-medium text-black transition hover:bg-white/90"
          >
            Login Again
          </Link>

          <Link
            href="/"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 transition hover:bg-white/10"
          >
            Go Home
          </Link>
        </div>

        <p className="mt-6 text-[11px] text-white/30">
          Security logout active • protected session
        </p>
      </motion.div>
    </main>
  );
};

export default UnauthorizedPage;
