"use client";

import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { deleteDonationRequest } from "@/lib/actions/donationRequest";

export function DeleteDonationModal({ donation, requesterId }) {
  const getDonationId = (donation) => {
    return donation?._id?.$oid || donation?._id;
  };

  const handleDelete = async () => {
    const id = getDonationId(donation);

    const result = await deleteDonationRequest(id, requesterId);

    if (result.deletedCount > 0) {
      toast.success("Donation request deleted successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);

      return;
    }

    toast.error("Delete failed");
  };

  return (
    <AlertDialog>
      <Button className="rounded-lg bg-red-100 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-300">
        Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>
                Delete donation request?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete request for{" "}
                <strong>{donation?.recipientName || "this recipient"}</strong>.
                This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button slot="close" variant="danger" onPress={handleDelete}>
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}