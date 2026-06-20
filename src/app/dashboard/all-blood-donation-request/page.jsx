import AllDonationRequestsTable from "@/components/Dashboard/AllDonationRequestsTable";
import { requireRole } from "@/lib/core/session";


const AllBloodDonationRequestPage = async () => {
  // both admin and volunteer can view this page
  await requireRole(["admin", "volunteer"]);

  return <AllDonationRequestsTable />;
};

export default AllBloodDonationRequestPage;
