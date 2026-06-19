import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <section className="min-h-screen bg-red-50 lg:flex">
      <DashboardSidebar />

      <main className="min-w-0 flex-1 p-4 pt-20 lg:p-8">
        {children}
      </main>
    </section>
  );
};

export default DashboardLayout;