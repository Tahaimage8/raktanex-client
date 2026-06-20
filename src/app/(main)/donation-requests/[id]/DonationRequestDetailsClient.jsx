"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { getPublicDonationRequestById } from "@/lib/api/donationRequest";


const DonationRequestDetailsClient = ({ id }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isPending && !user) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, user, router, pathname]);

  useEffect(() => {
    const loadDonationRequest = async () => {
      if (!id || !user) {
        return;
      }

      setLoading(true);

      const data = await getPublicDonationRequestById(id);

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
  }, [id, user]);

  if (isPending) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10">
        <Card className="p-8">
          <p className="text-sm font-bold text-red-600">Loading...</p>
        </Card>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10">
        <Card className="p-8">
          <p className="text-sm font-bold text-red-600">
            Loading donation request details...
          </p>
        </Card>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10">
        <Card className="p-8">
          <BackButton />

          <p className="text-sm font-bold text-red-600">{errorMessage}</p>
        </Card>
      </section>
    );
  }

  if (!donation) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10">
        <Card className="p-8">
          <BackButton />

          <p className="text-sm font-bold text-slate-500">
            No donation request found.
          </p>
        </Card>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <Card className="p-6 shadow-sm md:p-8">
        <BackButton />

        <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-red-500">
              Blood Donation Request
            </p>

            <h1 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">
              {donation.recipientName}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Full information about this blood donation request is shown below.
            </p>
          </div>

          <div className="flex w-fit flex-col items-center rounded-3xl bg-red-50 px-6 py-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-400">
              Blood
            </p>

            <p className="text-4xl font-black text-red-600">
              {donation.bloodGroup}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Info title="Recipient Name" value={donation.recipientName} />
          <Info title="Donation Status" value={donation.donationStatus} />
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

        <div className="mt-6 rounded-3xl bg-slate-50 p-5">
          <h2 className="text-lg font-black text-slate-900">
            Requester Information
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Info title="Requester Name" value={donation.requesterName} />
            <Info title="Requester Email" value={donation.requesterEmail} />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button color="danger" className="font-black">
            Donate
          </Button>
        </div>
      </Card>
    </section>
  );
};

const BackButton = () => {
  return (
    <Link
      href="/donation-requests"
      className="mb-5 inline-flex rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
    >
      Back
    </Link>
  );
};

const Info = ({ title, value }) => {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-sm font-bold text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  );
};

export default DonationRequestDetailsClient;