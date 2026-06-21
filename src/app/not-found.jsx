/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Button } from "@heroui/react";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-red-50 px-4">
      <div className="text-center">
        {/* Blood Drop Icon */}
        <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-red-100 shadow-lg shadow-red-100">
          <span className="text-6xl">🩸</span>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl font-black text-red-600">404</h1>

        {/* Message */}
        <h2 className="mt-4 text-3xl font-black text-slate-900">
          Page Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/">
            <Button className="inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-red-100 hover:bg-red-700">
              Go Home
            </Button>
          </Link>
        </div>

        {/* Bottom Text */}
        <p className="mt-12 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Raktanex — Save Lives, Donate Blood 🩸
        </p>
      </div>
    </main>
  );
};

export default NotFoundPage;
