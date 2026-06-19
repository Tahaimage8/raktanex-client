"use client";

const ViewRequest = ({ isOpen, donation, onClose }) => {
  if (!isOpen) {
    return null;
  }

  if (!donation) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Donation Request Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Full information of this donation request.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200"
          >
            X
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Info title="Recipient Name" value={donation.recipientName} />
          <Info title="Blood Group" value={donation.bloodGroup} />
          <Info title="Donation Status" value={donation.donationStatus} />
          <Info title="Donation Date" value={donation.donationDate} />
          <Info title="Donation Time" value={donation.donationTime} />
          <Info title="Division" value={donation.recipientDivision} />
          <Info title="District" value={donation.recipientDistrict} />
          <Info title="Upazila" value={donation.recipientUpazila} />
          <Info title="Hospital Name" value={donation.hospitalName} />
          <Info title="Requester Name" value={donation.requesterName} />
          <Info title="Requester Email" value={donation.requesterEmail} />

          {donation.donationStatus === "inprogress" && (
            <>
              <Info title="Donor Name" value={donation.donorName} />
              <Info title="Donor Email" value={donation.donorEmail} />
            </>
          )}
        </div>

        <div className="mt-4">
          <Info title="Full Address" value={donation.fullAddress} />
        </div>

        <div className="mt-4">
          <Info title="Request Message" value={donation.requestMessage} />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Info = ({ title, value }) => {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase text-slate-400">{title}</p>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  );
};

export default ViewRequest;