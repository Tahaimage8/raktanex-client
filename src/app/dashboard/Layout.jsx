import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";


const DashboardLayout = ({ children }) => {
  return (
    <section className="flex min-h-screen bg-red-50">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      <main className="flex-1 p-4 lg:p-8">{children}</main>
    </section>
  );
};

export default DashboardLayout;