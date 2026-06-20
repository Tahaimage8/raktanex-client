/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/immutability */
"use client";

import { useState, useEffect, Suspense } from "react";
import { redirect, useSearchParams } from "next/navigation";

import { fetchTotalFunds } from "@/lib/actions/fundActions";
import GiveFundModal from "./Givefundmodal";
import FundingTable from "./Fundingtable";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const FundingContent = () => {
  const [totalFunds, setTotalFunds] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const searchParams = useSearchParams();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;


  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }


  if (!user) {
    redirect('/login');
  }

  // Total fund load
  useEffect(() => {
    const loadTotal = async () => {
      const total = await fetchTotalFunds();
      setTotalFunds(total);
    };
    loadTotal();
  }, [refreshKey]);

  // Payment success/cancel handle
  useEffect(() => {
    const status = searchParams.get("status");
    const sessionId = searchParams.get("session_id");

    if (status === "success" && sessionId) {
      handleSuccess(sessionId);
    } else if (status === "cancelled") {
      toast.error("Payment was cancelled. Feel free to try again.");
      window.history.replaceState({}, "", "/funding");
    }
  }, [searchParams]);

  const handleSuccess = async (sessionId) => {
    try {
      await fetch("/api/save-fund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      toast.success("Thank you for your donation! 🩸");
      setRefreshKey(prev => prev + 1);
      window.history.replaceState({}, "", "/funding");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-red-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
              Funding <span className="text-red-600">History</span>
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage and track your contributions to the community.
            </p>
          </div>
          <GiveFundModal />
        </div>

        {/* Total Funds Card */}
        <div className="mt-6">
          <div className="rounded-2xl bg-linear-to-r from-red-500 to-red-700 p-6 text-white shadow-lg">
            <p className="text-sm font-medium text-red-100">Total Funds Raised</p>
            <p className="mt-2 text-4xl font-black">
              ${totalFunds.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8">
          <FundingTable key={refreshKey} />
        </div>
      </div>
    </main>
  );
};

const FundingPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    }>
      <FundingContent />
    </Suspense>
  );
};

export default FundingPage;