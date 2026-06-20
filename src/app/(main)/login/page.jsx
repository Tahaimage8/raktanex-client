"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import {
  FaRightToBracket,
  FaCircleCheck,
  FaTriangleExclamation,
} from "react-icons/fa6";

const inputClass =
  "h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none focus:border-red-500 disabled:bg-slate-100";

const Toast = ({ toast }) => (
  <AnimatePresence>
    {toast && (
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="fixed right-5 top-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-red-100 bg-white p-4 shadow-xl"
      >
        <div
          className={`text-xl ${
            toast.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {toast.type === "success" ? (
            <FaCircleCheck />
          ) : (
            <FaTriangleExclamation />
          )}
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900">{toast.title}</h4>
          <p className="text-sm text-slate-500">{toast.message}</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrlFromParams = searchParams.get("callbackUrl");
  const callbackUrl = callbackUrlFromParams?.startsWith("/")
    ? callbackUrlFromParams
    : "/";

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showToast = (type, title, message) => {
    setToast({ type, title, message });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const result = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      showToast("error", "Login failed", result.error.message);
      setLoading(false);
      return;
    }

    showToast("success", "Login successful", "Welcome back to RaktaNex.");

    setTimeout(() => {
      router.push(callbackUrl);
      router.refresh();
    }, 700);
  };

  return (
    <main className="min-h-screen bg-red-50 px-4 py-14">
      <Toast toast={toast} />

      <section className="mx-auto w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-2xl shadow-red-100 md:p-10">
        <div className="mb-10 text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-red-100 px-5 py-2 text-sm font-bold text-red-600">
            <FaRightToBracket />
            Login
          </p>

          <h1 className="mt-5 text-4xl font-black text-slate-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to continue using your RaktaNex account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Email
            </label>

            <input
              {...register("email", { required: "Email is required" })}
              disabled={loading}
              type="email"
              placeholder="Enter your email"
              className={inputClass}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Password
            </label>

            <input
              {...register("password", {
                required: "Password is required",
              })}
              disabled={loading}
              type="password"
              placeholder="Enter your password"
              className={inputClass}
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-red-600 text-base font-bold text-white shadow-lg shadow-red-100 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="font-bold text-red-600"
            >
              Register
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;