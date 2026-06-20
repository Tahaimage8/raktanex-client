import { requireRole } from "@/lib/core/session";
import DonationRequestDetailsClient from "./DonationRequestDetailsClient";

const DonationRequestDetailsPage = async ({ params }) => {
      await requireRole(["admin", "volunteer"]);
  const { id } = await params;

  return <DonationRequestDetailsClient id={id} />;
};

export default DonationRequestDetailsPage;