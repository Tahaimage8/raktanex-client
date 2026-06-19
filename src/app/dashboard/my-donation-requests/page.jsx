"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { getOwnDonationRequest } from "@/lib/api/donationRequest";

const statusOptions = ["pending", "inprogress", "done", "canceled"];

const MyDonationRequestsPage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const requesterId = user?.id || user?._id;

  const [donations, setDonations] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadDonationRequests = async () => {
      if (!requesterId) {
        return;
      }

      setLoading(true);

      const data = await getOwnDonationRequest(requesterId, filterStatus);

      if (Array.isArray(data)) {
        setDonations(data);
      } else {
        setDonations([]);
      }

      setLoading(false);
    };

    loadDonationRequests();
  }, [requesterId, filterStatus]);

  const totalPages = Math.ceil(donations.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentDonations = donations.slice(startIndex, endIndex);

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPaginationItems = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    const firstPages = [1, 2, 3];
    const lastPages = [totalPages - 2, totalPages - 1, totalPages];

    let middlePages = [];

    if (currentPage > 3 && currentPage < totalPages - 2) {
      middlePages = [currentPage - 1, currentPage, currentPage + 1];
    }

    const allPages = [...firstPages, ...middlePages, ...lastPages];

    const uniquePages = [...new Set(allPages)]
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);

    for (let i = 0; i < uniquePages.length; i++) {
      const currentItem = uniquePages[i];
      const previousItem = uniquePages[i - 1];

      if (i > 0 && currentItem - previousItem > 1) {
        pages.push("...");
      }

      pages.push(currentItem);
    }

    return pages;
  };

  const getDonationId = (donation) => {
    return donation?._id?.$oid || donation?._id;
  };

  const handleDone = (donation) => {};

  const handleCancel = (donation) => {};

  const handleEdit = (donation) => {};

  const handleDelete = (donation) => {};

  const handleView = (donation) => {
    const id = getDonationId(donation);

    router.push(`/dashboard/my-donation-requests/${id}`);
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
          onChange={handleFilterChange}
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

      <div className="rounded-3xl bg-white p-4 shadow-sm md:p-6">
        {loading ? (
          <p className="text-sm font-bold text-red-600">
            Loading donation requests...
          </p>
        ) : donations.length === 0 ? (
          <p className="text-sm font-bold text-slate-500">
            No donation request found.
          </p>
        ) : (
          <>
            <div className="grid gap-4 md:hidden">
              {currentDonations.map((donation) => (
                <div
                  key={getDonationId(donation)}
                  className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        {donation.recipientName}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {donation.recipientDistrict},{" "}
                        {donation.recipientUpazila}
                      </p>
                    </div>

                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
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

                    <div>
                      <p className="text-xs font-bold text-slate-400">
                        Donor Info
                      </p>

                      {donation.donationStatus === "inprogress" ? (
                        <div>
                          <p className="font-semibold text-slate-700">
                            {donation.donorName || "No donor name"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {donation.donorEmail || "No donor email"}
                          </p>
                        </div>
                      ) : (
                        <p className="text-slate-400">N/A</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {donation.donationStatus === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleDone(donation)}
                          className="rounded-lg bg-green-100 px-3 py-2 text-xs font-bold text-green-700 hover:bg-green-300"
                        >
                          Done
                        </button>

                        <button
                          onClick={() => handleCancel(donation)}
                          className="rounded-lg bg-orange-100 px-3 py-2 text-xs font-bold text-orange-700 hover:bg-orange-300"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleEdit(donation)}
                      className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-300"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(donation)}
                      className="rounded-lg bg-red-100 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-300"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleView(donation)}
                      className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-250 border-collapse text-left">
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
                  {currentDonations.map((donation) => (
                    <tr
                      key={getDonationId(donation)}
                      className="border-b border-slate-100 text-sm text-slate-700"
                    >
                      <td className="px-4 py-4 font-bold">
                        {donation.recipientName}
                      </td>

                      <td className="px-4 py-4">
                        {donation.recipientDistrict},{" "}
                        {donation.recipientUpazila}
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
                                className="rounded-lg bg-green-100 px-3 py-2 text-xs font-bold text-green-700 hover:bg-green-300"
                              >
                                Done
                              </button>

                              <button
                                onClick={() => handleCancel(donation)}
                                className="rounded-lg bg-orange-100 px-3 py-2 text-xs font-bold text-orange-700 hover:bg-orange-300"
                              >
                                Cancel
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => handleEdit(donation)}
                            className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-300"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(donation)}
                            className="rounded-lg bg-red-100 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-300"
                          >
                            Delete
                          </button>

                          <button
                            onClick={() => handleView(donation)}
                            className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {donations.length > itemsPerPage && (
          <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm font-semibold text-slate-500">
              Showing {startIndex + 1}-
              {Math.min(endIndex, donations.length)} of {donations.length}{" "}
              requests
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                size="sm"
                variant="flat"
                color="danger"
                isDisabled={currentPage === 1}
                onPress={handlePreviousPage}
                className="border border-red-200 bg-red-50 font-bold text-red-600"
              >
                Previous
              </Button>

              {getPaginationItems().map((item, index) => {
                if (item === "...") {
                  return (
                    <span
                      key={`dots-${index}`}
                      className="px-2 text-sm font-black text-slate-500"
                    >
                      ...
                    </span>
                  );
                }

                const isActivePage = currentPage === item;

                return (
                  <Button
                    key={item}
                    size="sm"
                    onPress={() => setCurrentPage(item)}
                    className={
                      isActivePage
                        ? "border border-red-600 bg-red-600 font-black text-white shadow-md shadow-red-100"
                        : "border border-slate-200 bg-white font-bold text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    }
                  >
                    {item}
                  </Button>
                );
              })}

              <Button
                size="sm"
                variant="flat"
                color="danger"
                isDisabled={currentPage === totalPages}
                onPress={handleNextPage}
                className="border border-red-200 bg-red-50 font-bold text-red-600"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyDonationRequestsPage;