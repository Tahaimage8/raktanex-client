"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { getPendingDonationRequests } from "@/lib/api/donationRequest";

const DonationRequestsPage = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const loadDonationRequests = async () => {
      setLoading(true);

      const data = await getPendingDonationRequests();

      if (Array.isArray(data)) {
        setDonationRequests(data);
      } else {
        setDonationRequests([]);
      }

      setLoading(false);
    };

    loadDonationRequests();
  }, []);

  const getDonationId = (donation) => {
    return donation?._id?.$oid || donation?._id;
  };

  const visibleDonationRequests = donationRequests.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 12);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 text-center">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-red-500">
          Donation Requests
        </p>

        <h1 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">
          Find Blood Requests
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          Browse pending blood donation requests and help someone in need.
        </p>
      </div>

      {loading ? (
        <Card className="p-8 text-center shadow-sm">
          <p className="text-sm font-bold text-red-600">
            Loading donation requests...
          </p>
        </Card>
      ) : donationRequests.length === 0 ? (
        <Card className="p-8 text-center shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            No pending donation request found.
          </p>
        </Card>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleDonationRequests.map((donation) => (
              <Card
                key={getDonationId(donation)}
                className="border border-red-100 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Card.Header>
                  <div className="flex w-full items-start justify-between gap-4">
                    <div>
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black uppercase text-orange-600">
                        {donation.donationStatus}
                      </span>

                      <Card.Title className="mt-4 text-xl font-black text-slate-900">
                        {donation.recipientName}
                      </Card.Title>

                      <Card.Description className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        Recipient
                      </Card.Description>
                    </div>

                    <div className="rounded-2xl bg-red-50 px-4 py-3 text-2xl font-black text-red-600 shadow-sm">
                      {donation.bloodGroup}
                    </div>
                  </div>
                </Card.Header>

                <Card.Content>
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {donation.recipientUpazila},{" "}
                        {donation.recipientDistrict}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                        Hospital
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {donation.hospitalName}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-slate-50 p-3">
                        <p className="text-xs font-black uppercase text-slate-400">
                          Date
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {donation.donationDate}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-3">
                        <p className="text-xs font-black uppercase text-slate-400">
                          Time
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {donation.donationTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Content>

                <Card.Footer>
                  <Link
                    href={`/donation-requests/${getDonationId(donation)}`}
                    className="mt-6 flex w-full items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-black text-white hover:bg-red-700"
                  >
                    View Details
                  </Link>
                </Card.Footer>
              </Card>
            ))}
          </div>

          {visibleCount < donationRequests.length && (
            <div className="mt-10 flex justify-center">
              <Button
                onPress={handleLoadMore}
                className="rounded-2xl bg-slate-900 px-8 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-red-600"
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default DonationRequestsPage;