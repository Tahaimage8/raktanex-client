/* eslint-disable react-hooks/immutability */
"use client";

import { useState, useEffect } from "react";
import { Table, Button } from "@heroui/react";
import { fetchAllFunds } from "@/lib/actions/fundActions";

const getInitial = (name) => {
  return name?.charAt(0)?.toUpperCase() || "?";
};

const FundingTable = () => {
  const [fundings, setFundings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadFunds();
  }, []);

  const loadFunds = async () => {
    try {
      const data = await fetchAllFunds();
      setFundings(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(fundings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFundings = fundings.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
        <span className="ml-2 text-slate-500">Loading...</span>
      </div>
    );
  }

  if (fundings.length === 0) {
    return (
      <div className="py-20 text-center">
        <span className="text-4xl">🩸</span>
        <p className="mt-4 text-slate-500">
          No contributions yet. Be the first!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm md:p-6">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table aria-label="Funding table">
          <Table.ScrollContainer>
            <Table.Content>
              <Table.Header>
                <Table.Column isRowHeader>Donor</Table.Column>
                <Table.Column>Transaction ID</Table.Column>
                <Table.Column>Date</Table.Column>
                <Table.Column>Amount</Table.Column>
                <Table.Column>Status</Table.Column>
              </Table.Header>
              <Table.Body>
                {currentFundings.map((fund) => (
                  <Table.Row key={fund._id}>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-sm font-black text-red-600">
                          {getInitial(fund.userName)}
                        </div>
                        <p className="font-bold text-slate-900">
                          {fund.userName}
                        </p>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-slate-400">
                        #{fund.stripeSessionId?.slice(-8) || "N/A"}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(fund.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Table.Cell>
                    <Table.Cell>
                      <span className="font-black text-slate-900">
                        ${fund.amount?.toFixed(2)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase text-green-700">
                        • success
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-3 md:hidden">
        {currentFundings.map((fund) => (
          <div
            key={fund._id}
            className="rounded-2xl border border-slate-100 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-sm font-black text-red-600">
                {getInitial(fund.userName)}
              </div>
              <div>
                <p className="font-bold text-slate-900">{fund.userName}</p>
                <p className="text-xs text-slate-400">
                  {new Date(fund.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-black text-slate-900">
                ${fund.amount?.toFixed(2)}
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                success
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            size="sm"
            disabled={currentPage === 1}
            onPress={() => setCurrentPage(currentPage - 1)}
            className="border border-red-200 bg-red-50 font-bold text-red-600"
          >
            Previous
          </Button>
          <span className="text-sm font-bold text-slate-500">
            {currentPage} / {totalPages}
          </span>
          <Button
            size="sm"
            disabled={currentPage === totalPages}
            onPress={() => setCurrentPage(currentPage + 1)}
            className="border border-red-200 bg-red-50 font-bold text-red-600"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default FundingTable;
