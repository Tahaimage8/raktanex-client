"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { usePagination } from "@/lib/hooks/usePagination";
import { updateDonationStatusAsAdmin } from "@/lib/actions/donationRequest";
import { getAllDonationRequests } from "@/lib/api/donationRequest";
import { AdminDeleteDonationModal } from "./AdminDeleteDonationModal";






const statusOptions = ["pending", "inprogress", "done", "canceled"];

const getDonationId = (donation) => {
  return donation?._id?.$oid || donation?._id;
};

const AllDonationRequestsTable = () => {
  const router = useRouter();

  const [donations, setDonations] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    currentItems: currentDonations,
    handlePreviousPage,
    handleNextPage,
    getPaginationItems,
  } = usePagination(donations, 5);

  useEffect(() => {
    const loadDonations = async () => {
      setLoading(true);

      const data = await getAllDonationRequests(filterStatus);

      setDonations(Array.isArray(data) ? data : []);
      setLoading(false);
    };

    loadDonations();
  }, [filterStatus]);

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1);
  };

  const updateLocalStatus = (id, newStatus) => {
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        getDonationId(donation) === id
          ? { ...donation, donationStatus: newStatus }
          : donation,
      ),
    );
  };

  const handleDone = async (donation) => {
    const id = getDonationId(donation);
    const result = await updateDonationStatusAsAdmin(id, "done");

    if (result.modifiedCount > 0) {
      updateLocalStatus(id, "done");
      toast.success("Marked as done");
      return;
    }

    toast.error("Status update failed");
  };

  const handleCancel = async (donation) => {
    const id = getDonationId(donation);
    const result = await updateDonationStatusAsAdmin(id, "canceled");

    if (result.modifiedCount > 0) {
      updateLocalStatus(id, "canceled");
      toast.success("Donation request canceled");
      return;
    }

    toast.error("Status update failed");
  };

  const handleDeleted = (deletedId) => {
    setDonations((prevDonations) =>
      prevDonations.filter(
        (donation) => getDonationId(donation) !== deletedId,
      ),
    );
  };

  const handleEdit = (donation) => {
    const id = getDonationId(donation);
    router.push(`/dashboard/all-blood-donation-request/${id}/edit`);
  };

  const handleView = (donation) => {
    const id = getDonationId(donation);
    router.push(`/dashboard/all-blood-donation-request/${id}`);
  };

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            All Donation Requests
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage public donation activities across the platform.
          </p>
        </div>

        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="h-12 rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-red-500"
        >
          <option value="all">All Statuses</option>

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
            {/* mobile cards */}
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
                      <p className="text-xs font-bold text-slate-400">
                        Blood
                      </p>
                      <p className="font-black text-red-600">
                        {donation.bloodGroup}
                      </p>
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
                      onClick={() => handleView(donation)}
                      className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleEdit(donation)}
                      className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-300"
                    >
                      Edit
                    </button>

                    <AdminDeleteDonationModal
                      donation={donation}
                      onDeleted={handleDeleted}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-250 border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-600">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Participants</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Group</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentDonations.map((donation, index) => (
                    <tr
                      key={getDonationId(donation)}
                      className="border-b border-slate-100 text-sm text-slate-700"
                    >
                      <td className="px-4 py-4 text-slate-400">
                        {String(startIndex + index + 1).padStart(2, "0")}
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-900">
                          {donation.recipientName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {donation.requesterEmail || "—"}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        {donation.recipientDistrict},{" "}
                        {donation.recipientUpazila}
                      </td>

                      <td className="px-4 py-4 font-bold text-red-600">
                        {donation.bloodGroup}
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold capitalize text-red-600">
                          {donation.donationStatus}
                        </span>
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
                            onClick={() => handleView(donation)}
                            className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300"
                          >
                            View
                          </button>

                          <button
                            onClick={() => handleEdit(donation)}
                            className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-300"
                          >
                            Edit
                          </button>

                          <AdminDeleteDonationModal
                            donation={donation}
                            onDeleted={handleDeleted}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {donations.length > 5 && (
          <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm font-semibold text-slate-500">
              Showing {startIndex + 1}-{Math.min(endIndex, donations.length)}{" "}
              of {donations.length} requests
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

export default AllDonationRequestsTable;
