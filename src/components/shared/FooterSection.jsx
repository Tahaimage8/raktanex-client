"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "@gravity-ui/icons";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaDroplet,
  FaHeartPulse,
  FaUserPlus,
  FaMagnifyingGlass,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Donation Requests", href: "/donation-requests" },
      { label: "Search Donors", href: "/search" },
      { label: "Funding", href: "/funding" },
    ],
  },
  {
    title: "Dashboard",
    links: [
      { label: "Dashboard Home", href: "/dashboard" },
      { label: "My Requests", href: "/dashboard/my-donation-requests" },
      { label: "Create Request", href: "/dashboard/create-donation-request" },
      { label: "Profile", href: "/dashboard/profile" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Become a Donor", href: "/register" },
      { label: "Login", href: "/login" },
      { label: "Contact Support", href: "#contact" },
      { label: "Emergency Help", href: "#contact" },
    ],
  },
];

const contactInfo = [
  {
    icon: <FaPhone />,
    label: "+880 1700-000000",
  },
  {
    icon: <FaEnvelope />,
    label: "support@raktanex.com",
  },
  {
    icon: <FaLocationDot />,
    label: "Bangladesh",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: <FaFacebookF />,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: <FaXTwitter />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: <FaLinkedinIn />,
  },
];

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-red-700/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-rose-700/20 blur-3xl" />

      {/* CTA Top */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.22em] text-red-400">
              <FaHeartPulse className="text-red-500" />
              Join the mission
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Be ready to save someone’s life today.
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-red-600 via-rose-600 to-red-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5"
            >
              <FaUserPlus />
              Join as a donor
            </Link>

            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <FaMagnifyingGlass />
              Search Donors
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_2fr] lg:px-8">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-red-600 via-rose-600 to-red-800 text-white shadow-lg shadow-red-950/40">
              <FaDroplet className="text-2xl" />

              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-300 text-[9px] text-red-900 ring-2 ring-slate-950">
                <Check className="h-3 w-3" />
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black tracking-tight">
                Rakta<span className="text-red-500">Nex</span>
              </h3>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                Blood Network
              </p>
            </div>
          </Link>

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            RaktaNex connects blood donors, recipients, volunteers, and admins
            through a clean, fast, and reliable blood donation management
            platform.
          </p>

          {/* Contact Info */}
          <div className="mt-6 space-y-3">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 text-sm font-medium text-slate-400"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/4 text-red-400 ring-1 ring-white/10">
                  {item.icon}
                </span>
                {item.label}
              </div>
            ))}
          </div>

          {/* Small Stats */}
          <div className="mt-6 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <p className="text-2xl font-black text-white">24/7</p>
              <p className="mt-1 text-xs font-medium text-slate-400">
                Emergency Support
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
              <p className="text-2xl font-black text-white">8+</p>
              <p className="mt-1 text-xs font-medium text-slate-400">
                Blood Groups
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <div className="grid gap-8 sm:grid-cols-3">
          {footerLinks.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: groupIndex * 0.08,
              }}
            >
              <h4 className="text-sm font-black uppercase tracking-[0.18em] text-white">
                {group.title}
              </h4>

              <ul className="mt-5 space-y-3">
                {group.links.map((item) => (
                  <li key={`${group.title}-${item.label}`}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-red-400"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/4 text-[10px] text-slate-500 transition group-hover:bg-red-500/10 group-hover:text-red-400">
                        <Check className="h-3 w-3" />
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-sm text-slate-500">
            © {year} RaktaNex. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/3 text-slate-400 transition hover:-translate-y-0.5 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}