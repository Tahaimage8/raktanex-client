"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getDonationRequestById } from "@/lib/api/donationRequest";
import { updateDonationRequest } from "@/lib/actions/donationRequest";
import toast from "react-hot-toast";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EditDonationRequestClient = ({ id }) => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const requesterId = user?.id || user?._id;

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDivision: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadDonationRequest = async () => {
      if (!id || !requesterId) {
        return;
      }

      setLoading(true);

      const data = await getDonationRequestById(id, requesterId);

      if (data?.message) {
        setErrorMessage(data.message);
      } else {
        setErrorMessage("");

        setFormData({
          recipientName: data.recipientName || "",
          recipientDivision: data.recipientDivision || "",
          recipientDistrict: data.recipientDistrict || "",
          recipientUpazila: data.recipientUpazila || "",
          hospitalName: data.hospitalName || "",
          fullAddress: data.fullAddress || "",
          bloodGroup: data.bloodGroup || "",
          donationDate: data.donationDate || "",
          donationTime: data.donationTime || "",
          requestMessage: data.requestMessage || "",
        });
      }

      setLoading(false);
    };

    loadDonationRequest();
  }, [id, requesterId]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setUpdating(true);

    const result = await updateDonationRequest(id, requesterId, formData);

    setUpdating(false);

    if (result.modifiedCount > 0 || result.matchedCount > 0) {
      toast.success("Donation request updated successfully");
      router.push("/dashboard/my-donation-requests");
      return;
    }

    toast.error(result.message || "Update failed");
  };

  if (isPending) {
    return <p className="text-sm font-bold text-red-600">Loading...</p>;
  }

  if (!user) {
    return <p className="text-sm font-bold text-red-600">Please login first.</p>;
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-sm font-bold text-red-600">
          Loading donation request...
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

  return (
    <section>
      <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
        <BackButton />

        <h1 className="text-3xl font-black text-slate-900">
          Edit Donation Request
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Only recipient and request details can be updated.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <InputBox
            label="Recipient Name"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
          />

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Blood Group
            </label>

            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-red-500"
              required
            >
              <option value="">Select blood group</option>

              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <InputBox
            label="Division"
            name="recipientDivision"
            value={formData.recipientDivision}
            onChange={handleChange}
          />

          <InputBox
            label="District"
            name="recipientDistrict"
            value={formData.recipientDistrict}
            onChange={handleChange}
          />

          <InputBox
            label="Upazila"
            name="recipientUpazila"
            value={formData.recipientUpazila}
            onChange={handleChange}
          />

          <InputBox
            label="Hospital Name"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
          />

          <InputBox
            label="Donation Date"
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
          />

          <InputBox
            label="Donation Time"
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <InputBox
            label="Full Address"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Request Message
          </label>

          <textarea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleChange}
            className="min-h-28 w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-red-500"
            required
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={updating}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {updating ? "Updating..." : "Update Request"}
          </button>

          <Link
            href="/dashboard/my-donation-requests"
            className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

const InputBox = ({ label, type = "text", name, value, onChange }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="h-12 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-red-500"
        required
      />
    </div>
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

export default EditDonationRequestClient;