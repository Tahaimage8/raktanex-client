"use client";

import { Table, Button } from "@heroui/react";
import { usePagination } from "@/lib/hooks/usePagination";

// dummy data for now - will be replaced with real API data later
const dummyFundings = [
  {
    id: "1",
    donor: "Imtiyaz Ahmed Shafin",
    role: "Member",
    transactionId: "1JGLHACO",
    date: "Apr 4, 2026",
    amount: 50,
    status: "success",
  },
  {
    id: "2",
    donor: "Sydney",
    role: "Member",
    transactionId: "1HTVU1R8",
    date: "Feb 13, 2026",
    amount: 50,
    status: "success",
  },
  {
    id: "3",
    donor: "Radwan",
    role: "Member",
    transactionId: "1DANNK7D",
    date: "Jan 18, 2026",
    amount: 59,
    status: "success",
  },
  {
    id: "4",
    donor: "Mahedi",
    role: "Member",
    transactionId: "1ZLKIFAC",
    date: "Jan 17, 2026",
    amount: 77,
    status: "success",
  },
  {
    id: "5",
    donor: "Mahedi",
    role: "Member",
    transactionId: "0YSI1CVO",
    date: "Dec 29, 2025",
    amount: 31,
    status: "success",
  },
  {
    id: "6",
    donor: "Mahedi",
    role: "Member",
    transactionId: "15KLR6AR",
    date: "Dec 29, 2025",
    amount: 50,
    status: "success",
  },
  {
    id: "7",
    donor: "Tanvir Islam",
    role: "Member",
    transactionId: "2BNQX1PL",
    date: "Dec 20, 2025",
    amount: 40,
    status: "success",
  },
  {
    id: "8",
    donor: "Rafiq Mia",
    role: "Member",
    transactionId: "3CMRY2QM",
    date: "Dec 18, 2025",
    amount: 65,
    status: "success",
  },
  {
    id: "9",
    donor: "Noman Islam",
    role: "Member",
    transactionId: "4DNSZ3RN",
    date: "Dec 10, 2025",
    amount: 25,
    status: "success",
  },
  {
    id: "10",
    donor: "Al Amin",
    role: "Member",
    transactionId: "5EOTA4SO",
    date: "Dec 5, 2025",
    amount: 90,
    status: "success",
  },
  {
    id: "11",
    donor: "Hasan Mahmud",
    role: "Member",
    transactionId: "6FPUB5TP",
    date: "Nov 28, 2025",
    amount: 35,
    status: "success",
  },
  {
    id: "12",
    donor: "Sumon",
    role: "Member",
    transactionId: "7GQVC6UQ",
    date: "Nov 20, 2025",
    amount: 45,
    status: "success",
  },
  {
    id: "13",
    donor: "Niloy",
    role: "Member",
    transactionId: "8HRWD7VR",
    date: "Nov 14, 2025",
    amount: 60,
    status: "success",
  },
  {
    id: "14",
    donor: "Rakib",
    role: "Member",
    transactionId: "9ISXE8WS",
    date: "Nov 8, 2025",
    amount: 55,
    status: "success",
  },
  {
    id: "15",
    donor: "Tania",
    role: "Member",
    transactionId: "0JTYF9XT",
    date: "Nov 2, 2025",
    amount: 70,
    status: "success",
  },
  {
    id: "16",
    donor: "Farhan",
    role: "Member",
    transactionId: "1KUZG0YU",
    date: "Oct 26, 2025",
    amount: 80,
    status: "success",
  },
  {
    id: "17",
    donor: "Mim",
    role: "Member",
    transactionId: "2LVAH1ZV",
    date: "Oct 19, 2025",
    amount: 33,
    status: "success",
  },
  {
    id: "18",
    donor: "Rezaul",
    role: "Member",
    transactionId: "3MWBI2AW",
    date: "Oct 12, 2025",
    amount: 48,
    status: "success",
  },
  {
    id: "19",
    donor: "Sabrina",
    role: "Member",
    transactionId: "4NXCJ3BX",
    date: "Oct 5, 2025",
    amount: 62,
    status: "success",
  },
  {
    id: "20",
    donor: "Imran",
    role: "Member",
    transactionId: "5OYDK4CY",
    date: "Sep 28, 2025",
    amount: 95,
    status: "success",
  },
  {
    id: "21",
    donor: "Rakib",
    role: "Member",
    transactionId: "9ISXE8WS",
    date: "Nov 8, 2025",
    amount: 55,
    status: "success",
  },
  {
    id: "22",
    donor: "Tania",
    role: "Member",
    transactionId: "0JTYF9XT",
    date: "Nov 2, 2025",
    amount: 70,
    status: "success",
  },
  {
    id: "23",
    donor: "Farhan",
    role: "Member",
    transactionId: "1KUZG0YU",
    date: "Oct 26, 2025",
    amount: 80,
    status: "success",
  },
  {
    id: "24",
    donor: "Mim",
    role: "Member",
    transactionId: "2LVAH1ZV",
    date: "Oct 19, 2025",
    amount: 33,
    status: "success",
  },
  {
    id: "25",
    donor: "Rezaul",
    role: "Member",
    transactionId: "3MWBI2AW",
    date: "Oct 12, 2025",
    amount: 48,
    status: "success",
  },
  {
    id: "26",
    donor: "Sabrina",
    role: "Member",
    transactionId: "4NXCJ3BX",
    date: "Oct 5, 2025",
    amount: 62,
    status: "success",
  },
];

const getInitial = (name) => {
  return name?.charAt(0)?.toUpperCase() || "?";
};

const FundingTable = () => {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    currentItems: currentFundings,
    handlePreviousPage,
    handleNextPage,
    getPaginationItems,
  } = usePagination(dummyFundings, 10);

  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm md:p-6">
      {/* mobile cards */}
      <div className="grid gap-3 md:hidden">
        {currentFundings.map((funding) => (
          <div
            key={funding.id}
            className="rounded-2xl border border-slate-100 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-black text-red-600">
                  {getInitial(funding.donor)}
                </div>

                <div>
                  <p className="font-bold text-slate-900">{funding.donor}</p>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    {funding.role}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase text-green-700">
                • {funding.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs font-bold text-slate-400">
                  Transaction ID
                </p>
                <p className="font-semibold text-slate-700">
                  #{funding.transactionId}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400">Date</p>
                <p className="font-semibold text-slate-700">{funding.date}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400">Amount</p>
                <p className="font-black text-slate-900">
                  ${funding.amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* desktop table */}
      <div className="hidden md:block">
        <Table aria-label="Funding history table">
          <Table.ScrollContainer>
            <Table.Content aria-label="Funding history">
              <Table.Header>
                <Table.Column>Donor</Table.Column>
                <Table.Column>Transaction ID</Table.Column>
                <Table.Column>Date</Table.Column>
                <Table.Column>Amount</Table.Column>
                <Table.Column>Status</Table.Column>
              </Table.Header>

              <Table.Body>
                {currentFundings.map((funding) => (
                  <Table.Row key={funding.id}>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-black text-red-600">
                          {getInitial(funding.donor)}
                        </div>

                        <div>
                          <p className="font-bold text-slate-900">
                            {funding.donor}
                          </p>
                          <p className="text-xs font-semibold uppercase text-slate-400">
                            {funding.role}
                          </p>
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-slate-400">
                        #{funding.transactionId}
                      </span>
                    </Table.Cell>

                    <Table.Cell>{funding.date}</Table.Cell>

                    <Table.Cell>
                      <span className="font-black text-slate-900">
                        ${funding.amount.toFixed(2)}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase text-green-700">
                        • {funding.status}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>

          <Table.Footer />
        </Table>
      </div>

      {/* pagination */}
      {dummyFundings.length > 10 && (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm font-semibold text-slate-500">
            Showing {startIndex + 1}-{Math.min(endIndex, dummyFundings.length)}{" "}
            of {dummyFundings.length} contributions
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              size="sm"
              variant="flat"
              color="danger"
              isDisabled={currentPage === 1}
              onPress={handlePreviousPage}
              className="border border-red-200 bg-red-50 font-bold text-red-600"
            >
              Previous
            </Button>

            {getPaginationItems().map((item, index) => {
              if (item === "...") {
                return (
                  <span
                    key={`dots-${index}`}
                    className="px-2 text-sm font-black text-slate-500"
                  >
                    ...
                  </span>
                );
              }

              const isActivePage = currentPage === item;

              return (
                <Button
                  key={item}
                  size="sm"
                  onPress={() => setCurrentPage(item)}
                  className={
                    isActivePage
                      ? "border border-red-600 bg-red-600 font-black text-white shadow-md shadow-red-100"
                      : "border border-slate-200 bg-white font-bold text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                  }
                >
                  {item}
                </Button>
              );
            })}

            <Button
              size="sm"
              variant="flat"
              color="danger"
              isDisabled={currentPage === totalPages}
              onPress={handleNextPage}
              className="border border-red-200 bg-red-50 font-bold text-red-600"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingTable;
