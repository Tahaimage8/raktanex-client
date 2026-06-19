/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const role = user?.role || "donor";
  const status = user?.status || "active";

  const isActive = (href) => {
    return pathname === href;
  };

  const handleLogout = async () => {
    await authClient.signOut();

    router.push("/login");
    router.refresh();
  };

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: "🏠",
      show: true,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: "👤",
      show: true,
    },

    // Donor only
    {
      label: "My Donation Requests",
      href: "/dashboard/my-donation-requests",
      icon: "🩸",
      show: role === "donor",
    },
    {
      label: "Create Donation Request",
      href: "/dashboard/create-donation-request",
      icon: "➕",
      show: role === "donor",
      disabled: status === "blocked",
    },

    // Admin only
    {
      label: "All Users",
      href: "/dashboard/all-users",
      icon: "👥",
      show: role === "admin",
    },

    // Admin + Volunteer
    {
      label: "All Blood Donation Requests",
      href: "/dashboard/all-blood-donation-request",
      icon: "📋",
      show: role === "admin" || role === "volunteer",
    },
    {
      label: "Funding",
      href: "/funding",
      icon: "💰",
      show: role === "admin" || role === "volunteer",
    },
  ];

  if (isPending) {
    return (
      <aside className="min-h-screen w-72 border-r border-red-100 bg-white p-5">
        <p className="text-sm font-bold text-red-600">Loading...</p>
      </aside>
    );
  }

  return (
    <aside className="min-h-screen w-72 border-r border-red-100 bg-white p-5">
      <div className="mb-8 rounded-3xl bg-red-50 p-4">
        <div className="flex items-center gap-3">
          <img
            src={user?.image || "https://i.ibb.co.com/4pDNDk1/avatar.png"}
            alt={user?.name || "User"}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
          />

          <div className="min-w-0">
            <h2 className="truncate text-sm font-black text-slate-900">
              {user?.name || "User"}
            </h2>

            <p className="truncate text-xs text-slate-500">{user?.email}</p>

            <p className="mt-1 text-xs font-bold capitalize text-red-600">
              {role}
            </p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems
          .filter((item) => item.show)
          .map((item) =>
            item.disabled ? (
              <button
                key={item.href}
                disabled
                title="Blocked users cannot create donation request"
                className="flex w-full cursor-not-allowed items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-left text-sm font-bold text-slate-400"
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  isActive(item.href)
                    ? "bg-red-600 text-white"
                    : "text-slate-700 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          )}

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-50"
        >
          <span>↪</span>
          Logout
        </button>
      </nav>

      {status === "blocked" && (
        <div className="mt-6 rounded-2xl bg-red-50 p-4 text-xs font-semibold text-red-600">
          Your account is blocked. You cannot create donation requests.
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;