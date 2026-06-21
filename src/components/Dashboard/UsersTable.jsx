/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Pagination } from "@heroui/react";
import {
  getAllUsers,
  updateUserStatus,
  updateUserRole,
} from "@/lib/actions/user";

const statusFilters = ["all", "active", "blocked"];

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const limit = 10;

  // fetch users whenever page or filter changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setErrorMessage("");

      const data = await getAllUsers(currentPage, limit, statusFilter);

      // if the request failed, the backend sends back { message: "..." }
      // instead of { users: [...] } - catch that instead of crashing on .map
      if (!data || !Array.isArray(data.users)) {
        setErrorMessage(
          data?.message || "Could not load users. Please try again.",
        );
        setUsers([]);
        setTotalUsers(0);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      setUsers(data.users);
      setTotalUsers(data.totalUsers || 0);
      setTotalPages(data.totalPages || 1);

      setLoading(false);
    };

    fetchUsers();
  }, [currentPage, statusFilter]);

  // when filter changes, go back to page 1
  const handleFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // block / unblock a user
  const handleStatusChange = async (id, newStatus) => {
    setActionLoadingId(id);

    const result = await updateUserStatus(id, newStatus);

    if (result.modifiedCount > 0) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, status: newStatus } : user,
        ),
      );
    }

    setActionLoadingId(null);
  };

  // change a user's role
  const handleRoleChange = async (id, newRole) => {
    setActionLoadingId(id);

    const result = await updateUserRole(id, newRole);

    if (result.modifiedCount > 0) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role: newRole } : user,
        ),
      );
    }

    setActionLoadingId(null);
  };

  const showingFrom = (currentPage - 1) * limit + 1;
  const showingTo = Math.min(currentPage * limit, totalUsers);

  // shared action buttons - used in both the mobile card view and desktop table
  const renderActions = (user) => (
    <div className="flex flex-wrap gap-2">
      {/* status action */}
      {user.status === "active" ? (
        <button
          disabled={actionLoadingId === user._id}
          onClick={() => handleStatusChange(user._id, "blocked")}
          className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 hover:bg-red-100 disabled:opacity-50"
        >
          Block
        </button>
      ) : (
        <button
          disabled={actionLoadingId === user._id}
          onClick={() => handleStatusChange(user._id, "active")}
          className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 hover:bg-green-100 disabled:opacity-50"
        >
          Unblock
        </button>
      )}

      {/* role actions - show the two roles the user is NOT currently */}
      {user.role !== "volunteer" && (
        <button
          disabled={actionLoadingId === user._id}
          onClick={() => handleRoleChange(user._id, "volunteer")}
          className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 hover:bg-blue-100 disabled:opacity-50"
        >
          Make Volunteer
        </button>
      )}

      {user.role !== "admin" && (
        <button
          disabled={actionLoadingId === user._id}
          onClick={() => handleRoleChange(user._id, "admin")}
          className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 hover:bg-purple-100 disabled:opacity-50"
        >
          Make Admin
        </button>
      )}

      {user.role !== "donor" && (
        <button
          disabled={actionLoadingId === user._id}
          onClick={() => handleRoleChange(user._id, "donor")}
          className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 hover:bg-amber-100 disabled:opacity-50"
        >
          Make Donor
        </button>
      )}
    </div>
  );

  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm md:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 md:text-2xl">
            All Users
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage donor, volunteer, and admin accounts.
          </p>
        </div>

        <div className="flex gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition ${
                statusFilter === filter
                  ? "bg-red-600 text-white"
                  : "bg-red-50 text-red-600 hover:bg-red-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="py-10 text-center text-sm font-bold text-red-600">
          Loading users...
        </p>
      ) : errorMessage ? (
        <p className="py-10 text-center text-sm font-bold text-red-600">
          {errorMessage}
        </p>
      ) : (
        <>
          {users.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">
              No users found.
            </p>
          ) : (
            <>
              {/* mobile + tablet: card list */}
              <div className="grid gap-4 lg:hidden">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="rounded-2xl border border-slate-100 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="h-12 w-12 shrink-0 rounded-full object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-slate-900">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {user.email}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize text-slate-700">
                            {user.role}
                          </span>

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${
                              user.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">{renderActions(user)}</div>
                  </div>
                ))}
              </div>

              {/* desktop: table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-200 text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                      <th className="py-3 pr-4">Avatar</th>
                      <th className="py-3 pr-4">Name</th>
                      <th className="py-3 pr-4">Email</th>
                      <th className="py-3 pr-4">Role</th>
                      <th className="py-3 pr-4">Status</th>
                      <th className="py-3 pr-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-slate-50 last:border-0"
                      >
                        <td className="py-4 pr-4">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </td>

                        <td className="py-4 pr-4 font-bold text-slate-900">
                          {user.name}
                        </td>

                        <td className="py-4 pr-4 text-slate-500">
                          {user.email}
                        </td>

                        <td className="py-4 pr-4">
                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize text-slate-700">
                            {user.role}
                          </span>
                        </td>

                        <td className="py-4 pr-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${
                              user.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td className="py-4 pr-4">{renderActions(user)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination>
                <Pagination.Summary>
                  Showing {showingFrom}-{showingTo} of {totalUsers} results
                </Pagination.Summary>

                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                    >
                      <Pagination.PreviousIcon />
                      <span>Previous</span>
                    </Pagination.Previous>
                  </Pagination.Item>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Pagination.Item key={page}>
                        <Pagination.Link
                          isActive={page === currentPage}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Pagination.Link>
                      </Pagination.Item>
                    ),
                  )}

                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages),
                        )
                      }
                    >
                      <span>Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UsersTable;