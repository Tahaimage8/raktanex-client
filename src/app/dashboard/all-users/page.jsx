import { requireRole } from "@/lib/core/session";
import UsersTable from "@/components/Dashboard/UsersTable";

const AllUsersPage = async () => {
  await requireRole("admin");

  return <UsersTable />;
};

export default AllUsersPage;