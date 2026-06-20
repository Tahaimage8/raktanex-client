"use client";

import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { confirmDonationRequest } from "@/lib/actions/donationRequest";

const DonateConfirmModal = ({ donation, user, onSuccess }) => {
  const handleConfirmDonation = async () => {
    const id = donation?._id?.$oid || donation?._id;

    const donorInfo = {
      donorName: user?.name,
      donorEmail: user?.email,
    };

    const result = await confirmDonationRequest(id, donorInfo);

    if (result.modifiedCount > 0) {
      toast.success("Donation request confirmed successfully");

      onSuccess({
        ...donation,
        donationStatus: "inprogress",
        donorName: user?.name,
        donorEmail: user?.email,
      });

      return;
    }

    toast.error("Donation request is not available now");
  };

  return (
    <AlertDialog>
      <Button color="danger" className="font-black">
        Donate
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-120">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>
                Confirm your donation?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <div>
                <p className="text-sm leading-6 text-slate-500">
                  Please confirm your donor information before accepting this
                  donation request.
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Donor Name
                    </label>

                    <input
                      value={user?.name || ""}
                      readOnly
                      className="h-12 w-full rounded-xl border border-slate-300 bg-slate-100 px-4 text-sm font-bold text-slate-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Donor Email
                    </label>

                    <input
                      value={user?.email || ""}
                      readOnly
                      className="h-12 w-full rounded-xl border border-slate-300 bg-slate-100 px-4 text-sm font-bold text-slate-700 outline-none"
                    />
                  </div>
                </div>
              </div>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                slot="close"
                variant="danger"
                onPress={handleConfirmDonation}
              >
                Confirm Donation
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DonateConfirmModal;