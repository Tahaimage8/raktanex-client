"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { FaUsers, FaHandHoldingDollar, FaDroplet } from "react-icons/fa6";

import { getAllUsersVolente } from "@/lib/actions/user";
import { getAllDonationRequests } from "@/lib/api/donationRequest";
import { fetchTotalFunds } from "@/lib/actions/fundActions";

// animates a number counting up from 0 to `value` whenever it changes
const CountUpNumber = ({ value }) => {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: "easeOut",
    });

    const unsubscribe = rounded.on("change", (latest) => {
      setDisplay(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, motionValue, rounded]);

  return <span>{display}</span>;
};

const StatCard = ({ icon, title, value, delay, footnote }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-3xl bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-600 size-12">
        {icon}
      </div>

      <p className="mt-5 text-4xl font-black text-slate-900">
        <CountUpNumber value={value} />
      </p>

      <p className="mt-1 text-sm font-bold text-slate-500">{title}</p>

      {footnote && <p className="mt-1 text-xs text-slate-400">{footnote}</p>}
    </motion.div>
  );
};

const DashboardVolunteer = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDonationRequests, setTotalDonationRequests] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalFunds, setTotalFunds] = useState(0);

  useEffect(() => {
    const loadTotal = async () => {
      const total = await fetchTotalFunds();
      setTotalFunds(total);
    };

    loadTotal();
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);

      const usersData = await getAllUsersVolente();
      const donationData = await getAllDonationRequests("all");

      setTotalUsers(usersData?.totalUsers || 0);
      setTotalDonationRequests(
        Array.isArray(donationData) ? donationData.length : 0,
      );

      setLoading(false);
    };

    loadStats();
  }, []);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-black text-slate-900">
        Volunteer Overview
      </h2>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <StatCard
          icon={<FaUsers />}
          title="Total Donors"
          value={loading ? 0 : totalUsers}
          delay={0}
        />

        <StatCard
          icon={<FaHandHoldingDollar />}
          title="Total Funding"
          value={loading ? 0 : totalFunds}
          delay={0.1}
        />

        <StatCard
          icon={<FaDroplet />}
          title="Total Blood Donation Requests"
          value={loading ? 0 : totalDonationRequests}
          delay={0.2}
        />
      </div>
    </div>
  );
};

export default DashboardVolunteer;