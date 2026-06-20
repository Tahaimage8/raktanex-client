"use client";

import { useEffect, useState } from "react";
import { Button, Input, TextArea } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { createDonationRequest } from "@/lib/actions/donationRequest";
import toast from "react-hot-toast";
import {useRouter } from "next/navigation";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

const inputClass = "w-full";

const selectClass =
  "h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-red-500 disabled:bg-slate-100";

const getTableData = (data, tableName) => {
  const table = data.find(
    (item) => item.type === "table" && item.name === tableName,
  );

  return table?.data || [];
};

const CreateDonationRequestPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;


  const userStatus = user?.status || "active";

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

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
  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login?callbackUrl=/dashboard");
    }
  }, [isPending, user, router]);
  useEffect(() => {
    const loadLocationData = async () => {
      const divisionResponse = await fetch("/divisions.json");
      const districtResponse = await fetch("/districts.json");
      const upazilaResponse = await fetch("/upazilas.json");

      const divisionData = await divisionResponse.json();
      const districtData = await districtResponse.json();
      const upazilaData = await upazilaResponse.json();

      const allDivisions = getTableData(divisionData, "divisions");
      const allDistricts = getTableData(districtData, "districts");
      const allUpazilas = getTableData(upazilaData, "upazilas");

      setDivisions(allDivisions);
      setDistricts(allDistricts);
      setUpazilas(allUpazilas);
    };

    loadLocationData();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "recipientDivision") {
      setFormData({
        ...formData,
        recipientDivision: value,
        recipientDistrict: "",
        recipientUpazila: "",
      });

      return;
    }

    if (name === "recipientDistrict") {
      setFormData({
        ...formData,
        recipientDistrict: value,
        recipientUpazila: "",
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const filteredDistricts = districts.filter(
    (district) =>
      String(district.division_id) === String(formData.recipientDivision),
  );

  const filteredUpazilas = upazilas.filter(
    (upazila) =>
      String(upazila.district_id) === String(formData.recipientDistrict),
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userStatus === "blocked") {
      toast.error("Your account is blocked. You cannot create donation request.");
      return;
    }

    const selectedDivision = divisions.find(
      (division) => String(division.id) === String(formData.recipientDivision),
    );

    const selectedDistrict = districts.find(
      (district) => String(district.id) === String(formData.recipientDistrict),
    );

    const selectedUpazila = upazilas.find(
      (upazila) => String(upazila.id) === String(formData.recipientUpazila),
    );

    const donationRequest = {
      requesterName: user?.name,
      requesterEmail: user?.email,
      requesterId: user?.id || user?._id,
      recipientName: formData.recipientName,
      recipientDivision: selectedDivision?.name,
      recipientDistrict: selectedDistrict?.name,
      recipientUpazila: selectedUpazila?.name,
      hospitalName: formData.hospitalName,
      fullAddress: formData.fullAddress,
      bloodGroup: formData.bloodGroup,
      donationDate: formData.donationDate,
      donationTime: formData.donationTime,
      requestMessage: formData.requestMessage,
      donationStatus: "pending",
    };

    // console.log("Donation Request Data:", donationRequest);

    const res = await createDonationRequest(donationRequest);
    console.log(res);
    if (res?.insertedId) {
      toast.success("Donation request created successfully");
      router.push("/dashboard")
      return;
    }

    toast.error("Something went wrong. Please try again.");
  };

  if (isPending) {
    return <p className="text-sm font-bold text-red-600">Loading...</p>;
  }

  return (
    <section>
      <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900">
          Create Donation Request
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Fill up the form to create a blood donation request.
        </p>
      </div>

      {userStatus === "blocked" && (
        <div className="mb-6 rounded-2xl bg-red-100 p-4 text-sm font-bold text-red-600">
          Your account is blocked. You cannot create donation request.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Requester Name</label>
            <Input
              value={user?.name || ""}
              readOnly
              disabled
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Requester Email</label>
            <Input
              value={user?.email || ""}
              readOnly
              disabled
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Recipient Name</label>
            <Input
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              placeholder="Enter recipient name"
              disabled={userStatus === "blocked"}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              disabled={userStatus === "blocked"}
              required
              className={selectClass}
            >
              <option value="">Select blood group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Recipient Division</label>
            <select
              name="recipientDivision"
              value={formData.recipientDivision}
              onChange={handleChange}
              disabled={userStatus === "blocked"}
              required
              className={selectClass}
            >
              <option value="">Select division</option>
              {divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Recipient District</label>
            <select
              name="recipientDistrict"
              value={formData.recipientDistrict}
              onChange={handleChange}
              disabled={!formData.recipientDivision || userStatus === "blocked"}
              required
              className={selectClass}
            >
              <option value="">
                {formData.recipientDivision
                  ? "Select district"
                  : "Select division first"}
              </option>

              {filteredDistricts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Recipient Upazila</label>
            <select
              name="recipientUpazila"
              value={formData.recipientUpazila}
              onChange={handleChange}
              disabled={!formData.recipientDistrict || userStatus === "blocked"}
              required
              className={selectClass}
            >
              <option value="">
                {formData.recipientDistrict
                  ? "Select upazila"
                  : "Select district first"}
              </option>

              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Hospital Name</label>
            <Input
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="Dhaka Medical College Hospital"
              disabled={userStatus === "blocked"}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Full Address</label>
            <Input
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              placeholder="Zahir Raihan Rd, Dhaka"
              disabled={userStatus === "blocked"}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Donation Date</label>
            <Input
              type="date"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleChange}
              disabled={userStatus === "blocked"}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Donation Time</label>
            <Input
              type="time"
              name="donationTime"
              value={formData.donationTime}
              onChange={handleChange}
              disabled={userStatus === "blocked"}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5">
          <label className={labelClass}>Request Message</label>
          <TextArea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleChange}
            placeholder="Write why you need blood..."
            disabled={userStatus === "blocked"}
            className="h-50 w-full"
            required
          />
        </div>

        <Button
          type="submit"
          color="danger"
          className="mt-6 font-bold"
          disabled={userStatus === "blocked"}
        >
          Request
        </Button>
      </form>
    </section>
  );
};

export default CreateDonationRequestPage;
