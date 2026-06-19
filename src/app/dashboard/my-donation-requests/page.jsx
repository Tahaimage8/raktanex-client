"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getOwnDonationRequest } from "@/lib/api/donationRequest";

const statusOptions = ["pending", "inprogress", "done", "canceled"];

const MyDonationRequestsPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const requesterId = user?.id || user?._id;

  const [donations, setDonations] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDonationRequests = async () => {
      if (!requesterId) {
        return;
      }

      setLoading(true);

      const data = await getOwnDonationRequest(requesterId, filterStatus);

      setDonations(data);
      setLoading(false);
    };

    loadDonationRequests();
  }, [requesterId, filterStatus]);

  const handleDone = (donation) => {
    console.log("Done clicked:", donation);
  };

  const handleCancel = (donation) => {
    console.log("Cancel clicked:", donation);
  };

  const handleEdit = (donation) => {
    console.log("Edit clicked:", donation);
  };

  const handleDelete = (donation) => {
    console.log("Delete clicked:", donation);
  };

  const handleView = (donation) => {
    console.log("View clicked:", donation);
  };

  if (isPending) {
    return <p className="text-sm font-bold text-red-600">Loading...</p>;
  }

  if (!user) {
    return <p className="text-sm font-bold text-red-600">Please login first.</p>;
  }

  return (
    <section>
      <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900">
          My Donation Requests
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Here you can see all blood donation requests created by you.
        </p>
      </div>

      <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-slate-700">
          Filter By Status
        </label>

        <select
          value={filterStatus}
          onChange={(event) => setFilterStatus(event.target.value)}
          className="h-12 w-full max-w-xs rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-red-500"
        >
          <option value="">All Requests</option>

          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-3xl bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-sm font-bold text-red-600">
            Loading donation requests...
          </p>
        ) : donations.length === 0 ? (
          <p className="text-sm font-bold text-slate-500">
            No donation request found.
          </p>
        ) : (
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-600">
                <th className="px-4 py-3">Recipient</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Blood</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Donor Info</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {donations.map((donation) => (
                <tr
                  key={donation._id}
                  className="border-b border-slate-100 text-sm text-slate-700"
                >
                  <td className="px-4 py-4 font-bold">
                    {donation.recipientName}
                  </td>

                  <td className="px-4 py-4">
                    {donation.recipientDistrict}, {donation.recipientUpazila}
                  </td>

                  <td className="px-4 py-4">{donation.donationDate}</td>

                  <td className="px-4 py-4">{donation.donationTime}</td>

                  <td className="px-4 py-4 font-bold text-red-600">
                    {donation.bloodGroup}
                  </td>

                  <td className="px-4 py-4">
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                      {donation.donationStatus}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    {donation.donationStatus === "inprogress" ? (
                      <div>
                        <p>{donation.donorName || "No donor name"}</p>
                        <p className="text-xs text-slate-500">
                          {donation.donorEmail || "No donor email"}
                        </p>
                      </div>
                    ) : (
                      <span className="text-slate-400">N/A</span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {donation.donationStatus === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleDone(donation)}
                            className="rounded-lg bg-green-100 px-3 py-2 text-xs font-bold text-green-700"
                          >
                            Done
                          </button>

                          <button
                            onClick={() => handleCancel(donation)}
                            className="rounded-lg bg-orange-100 px-3 py-2 text-xs font-bold text-orange-700"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleEdit(donation)}
                        className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-bold text-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(donation)}
                        className="rounded-lg bg-red-100 px-3 py-2 text-xs font-bold text-red-700"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => handleView(donation)}
                        className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default MyDonationRequestsPage;