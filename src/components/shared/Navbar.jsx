/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const user = session?.user;
  const isLoggedIn = Boolean(user);

  const userName = user?.name || "Donor";
  const userEmail = user?.email || "donor@raktanex.com";
  const userRole = user?.role || "donor";
  const userAvatar =
    user?.image || "https://i.ibb.co.com/4pDNDk1/avatar.png";

  // const dashboardLink = `/dashboard/${userRole}`;
  const dashboardLink = `/dashboard`;

  const canSeeFunding = userRole === "volunteer";

  const navLinks = [
    {
      label: "Home",
      href: "/",
      show: true,
    },
    {
      label: "Donation Requests",
      href: "/donation-requests",
      show: true,
    },
    {
      label: "Funding",
      href: "/funding",
      show: canSeeFunding,
    },
    {
      label: "Search Donor",
      href: "/search",
      show: true,
    },
  ];

  const isActive = (href) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    await authClient.signOut();

    setDropdownOpen(false);
    setMobileMenuOpen(false);

    router.push("/login");
    router.refresh();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-red-100 bg-white/90 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          {navLinks
            .filter((link) => link.show)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold transition ${
                  isActive(link.href)
                    ? "text-red-700"
                    : "text-slate-700 hover:text-red-700"
                }`}
              >
                {link.label}

                {isActive(link.href) && (
                  <motion.span
                    layoutId="active-nav-line"
                    className="absolute -bottom-2 left-0 h-0.75 w-full rounded-full bg-red-600"
                  />
                )}
              </Link>
            ))}
        </div>

        <div className="flex items-center gap-3">
          {isPending ? (
            <p className="hidden text-sm font-bold text-slate-500 md:block">
              Loading...
            </p>
          ) : !isLoggedIn ? (
            <Link
              href="/login"
              className="hidden rounded-full bg-linear-to-r from-red-600 via-rose-600 to-red-700 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:shadow-red-300 md:inline-flex"
            >
              Login
            </Link>
          ) : (
            <div ref={dropdownRef} className="relative hidden md:block">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-2 py-1 transition hover:bg-red-100"
              >
                <img
                  src={userAvatar}
                  alt={userName}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                />

                <div className="hidden pr-2 text-left lg:block">
                  <p className="max-w-30 truncate text-xs font-bold text-slate-800">
                    {userName}
                  </p>
                  <p className="max-w-32.5 truncate text-[10px] text-slate-500">
                    {userEmail}
                  </p>
                </div>

                <svg
                  className={`h-4 w-4 text-slate-500 transition ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-3 w-64 overflow-hidden rounded-3xl border border-red-100 bg-white p-2 shadow-2xl shadow-slate-200"
                  >
                    <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-3">
                      <img
                        src={userAvatar}
                        alt={userName}
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
                      />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {userName}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {userEmail}
                        </p>
                        <p className="mt-1 text-xs font-bold capitalize text-red-600">
                          {userRole}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 space-y-1">
                      <Link
                        href={dashboardLink}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-700"
                      >
                        <span>📊</span>
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <span>↪</span>
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-100 bg-red-50 text-slate-800 md:hidden"
          >
            {mobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-red-100 bg-white md:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-2 px-4 py-4">
              {navLinks
                .filter((link) => link.show)
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-sm font-bold transition ${
                      isActive(link.href)
                        ? "bg-red-50 text-red-700"
                        : "text-slate-700 hover:bg-red-50 hover:text-red-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

              {isPending ? (
                <div className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-600">
                  Loading...
                </div>
              ) : !isLoggedIn ? (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-2xl bg-linear-to-r from-red-600 via-rose-600 to-red-700 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-red-200"
                >
                  Login
                </Link>
              ) : (
                <div className="rounded-3xl border border-red-100 bg-red-50 p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {userName}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {userEmail}
                      </p>
                      <p className="mt-1 text-xs font-bold capitalize text-red-600">
                        {userRole}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link
                      href={dashboardLink}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold text-slate-700 transition hover:text-red-700"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;