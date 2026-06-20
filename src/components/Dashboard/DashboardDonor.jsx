"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOwnDonationRequest } from "@/lib/api/donationRequest";


const DashboardDonor = ({ user }) => {
  const requesterId = user?.id || user?._id;

  const [latestRequests, setLatestRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadLatestRequests = async () => {
      if (!requesterId) {
        return;
      }

      setLoading(true);

      const data = await getOwnDonationRequest(requesterId);

      if (Array.isArray(data)) {
        const sortedData = data.sort((a, b) => {
          const firstId = a?._id?.$oid || a?._id;
          const secondId = b?._id?.$oid || b?._id;

          if (firstId < secondId) {
            return 1;
          }

          if (firstId > secondId) {
            return -1;
          }

          return 0;
        });

        setLatestRequests(sortedData.slice(0, 3));
      } else {
        setLatestRequests([]);
      }

      setLoading(false);
    };

    loadLatestRequests();
  }, [requesterId]);

  const getDonationId = (donation) => {
    return donation?._id?.$oid || donation?._id;
  };

  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm md:p-6">
      {loading ? (
        <p className="text-sm font-bold text-red-600">
          Loading latest requests...
        </p>
      ) : latestRequests.length === 0 ? (
        <p className="text-sm font-bold text-slate-500">
          No donation request found.
        </p>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-220 border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.25em] text-slate-400">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Participants</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Schedule</th>
                  <th className="px-4 py-3">Need</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {latestRequests.map((donation, index) => (
                  <tr
                    key={getDonationId(donation)}
                    className="border-b border-slate-100 text-sm text-slate-700"
                  >
                    <td className="px-4 py-5 font-black text-slate-300">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="px-4 py-5">
                      <p className="font-black text-slate-900">
                        {donation.recipientName}
                      </p>

                      <p className="text-xs font-semibold text-slate-400">
                        Requested by Donor
                      </p>
                    </td>

                    <td className="px-4 py-5 font-semibold text-slate-600">
                      {donation.recipientUpazila},{" "}
                      {donation.recipientDistrict}
                    </td>

                    <td className="px-4 py-5">
                      <p className="font-semibold text-slate-700">
                        {donation.donationDate}
                      </p>

                      <p className="text-xs font-semibold text-slate-500">
                        {donation.donationTime}
                      </p>
                    </td>

                    <td className="px-4 py-5">
                      <span className="rounded-xl bg-red-50 px-3 py-2 font-black text-red-600">
                        {donation.bloodGroup}
                      </span>
                    </td>

                    <td className="px-4 py-5">
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black uppercase text-orange-600">
                        {donation.donationStatus}
                      </span>
                    </td>

                    <td className="px-4 py-5">
                      <Link
                        href={`/dashboard/my-donation-requests/${getDonationId(
                          donation
                        )}`}
                        className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:hidden">
            {latestRequests.map((donation, index) => (
              <div
                key={getDonationId(donation)}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-slate-300">
                      #{index + 1}
                    </p>

                    <h3 className="mt-1 text-base font-black text-slate-900">
                      {donation.recipientName}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {donation.recipientUpazila},{" "}
                      {donation.recipientDistrict}
                    </p>
                  </div>

                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black uppercase text-orange-600">
                    {donation.donationStatus}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs font-bold text-slate-400">Date</p>
                    <p className="font-semibold text-slate-700">
                      {donation.donationDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400">Time</p>
                    <p className="font-semibold text-slate-700">
                      {donation.donationTime}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400">Blood</p>
                    <p className="font-black text-red-600">
                      {donation.bloodGroup}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-8 flex justify-center">
        <Link
          href="/dashboard/my-donation-requests"
          className="rounded-xl bg-slate-900 px-7 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-red-600"
        >
          View All Requests
        </Link>
      </div>
    </div>
  );
};

export default DashboardDonor;