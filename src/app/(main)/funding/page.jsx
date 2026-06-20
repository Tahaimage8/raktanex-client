import FundingTable from "./Fundingtable";
import GiveFundModal from "./Givefundmodal";

 
const FundingPage = () => {
  return (
    <main className="min-h-screen bg-red-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
              Funding <span className="text-red-600">History</span>
            </h1>
 
            <p className="mt-2 text-sm text-slate-500">
              Manage and track your contributions to the community.
            </p>
          </div>
 
          <GiveFundModal />
        </div>
 
        <div className="mt-8">
          <FundingTable />
        </div>
      </div>
    </main>
  );
};
 
export default FundingPage;