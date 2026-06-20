"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getDonationRequestByIdaAdmin } from "@/lib/api/donationRequest";

const DonationRequestDetailsClient = ({ id }) => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const requesterId = user?.id || user?._id;

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadDonationRequest = async () => {
      if (!id || !requesterId) {
        return;
      }

      setLoading(true);

      const data = await getDonationRequestByIdaAdmin(id);

      if (data?.message) {
        setErrorMessage(data.message);
        setDonation(null);
      } else {
        setDonation(data);
        setErrorMessage("");
      }

      setLoading(false);
    };

    loadDonationRequest();
  }, [id, requesterId]);

  if (isPending) {
    return <p className="text-sm font-bold text-red-600">Loading...</p>;
  }

  if (!user) {
    return (
      <p className="text-sm font-bold text-red-600">Please login first.</p>
    );
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-sm font-bold text-red-600">
          Loading donation request details...
        </p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <BackButton />

        <p className="text-sm font-bold text-red-600">{errorMessage}</p>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <BackButton />

        <p className="text-sm font-bold text-slate-500">
          No donation request found.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
        <BackButton />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Donation Request Details
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Here you can view full information of this donation request.
            </p>
          </div>

          <span className="w-fit rounded-full bg-red-100 px-4 py-2 text-xs font-black uppercase text-red-600">
            {donation.donationStatus}
          </span>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-black text-slate-900">
          Recipient Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Info title="Recipient Name" value={donation.recipientName} />
          <Info title="Blood Group" value={donation.bloodGroup} />
          <Info title="Division" value={donation.recipientDivision} />
          <Info title="District" value={donation.recipientDistrict} />
          <Info title="Upazila" value={donation.recipientUpazila} />
          <Info title="Hospital Name" value={donation.hospitalName} />
          <Info title="Donation Date" value={donation.donationDate} />
          <Info title="Donation Time" value={donation.donationTime} />
        </div>

        <div className="mt-4">
          <Info title="Full Address" value={donation.fullAddress} />
        </div>

        <div className="mt-4">
          <Info title="Request Message" value={donation.requestMessage} />
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-black text-slate-900">
          Requester Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Info title="Requester Name" value={donation.requesterName} />
          <Info title="Requester Email" value={donation.requesterEmail} />
        </div>
      </div>

      {donation.donationStatus === "inprogress" && (
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-black text-slate-900">
            Donor Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Info title="Donor Name" value={donation.donorName} />
            <Info title="Donor Email" value={donation.donorEmail} />
          </div>
        </div>
      )}
    </section>
  );
};

const BackButton = () => {
  return (
    <Link
      href="/dashboard/my-donation-requests"
      className="mb-4 inline-flex rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
    >
      Back
    </Link>
  );
};

const Info = ({ title, value }) => {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-black uppercase text-slate-400">{title}</p>

      <p className="mt-2 text-sm font-bold text-slate-800">{value || "N/A"}</p>
    </div>
  );
};

export default DonationRequestDetailsClient;
