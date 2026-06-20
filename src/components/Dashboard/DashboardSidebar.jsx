/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const Icon = ({ children }) => {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      {children}
    </svg>
  );
};

const icons = {
  menu: (
    <Icon>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </Icon>
  ),
  close: (
    <Icon>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </Icon>
  ),
  dashboard: (
    <Icon>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5 12 4l9 7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10.5V20h14v-9.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20v-6h6v6" />
    </Icon>
  ),
  profile: (
    <Icon>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20a8 8 0 0 1 16 0" />
    </Icon>
  ),
  request: (
    <Icon>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h.01M3 12h.01M3 18h.01" />
    </Icon>
  ),
  create: (
    <Icon>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </Icon>
  ),
  users: (
    <Icon>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20a5 5 0 0 0-10 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 20a4 4 0 0 0-3-3.87" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 4.13a4 4 0 0 1 0 7.75" />
    </Icon>
  ),
  funding: (
    <Icon>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 7.5c0-1.93-2.24-3.5-5-3.5S7 5.57 7 7.5 9.24 11 12 11s5 1.57 5 3.5S14.76 18 12 18s-5-1.57-5-3.5" />
    </Icon>
  ),
  logout: (
    <Icon>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17l5-5-5-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" />
    </Icon>
  ),
};

const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);

  const user = session?.user;
  const role = user?.role || "donor";
  const status = user?.status || "active";

  // exact-match-only routes: highlighting these on every sub-route would make
  // "Dashboard" stay active no matter which dashboard page you're actually on
  const exactMatchOnly = ["/dashboard"];

  const isActive = (href) => {
    if (exactMatchOnly.includes(href)) {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    await authClient.signOut();

    setOpen(false);
    router.push("/login");
    router.refresh();
  };

  const handleNavigate = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: icons.dashboard,
      show: true,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: icons.profile,
      show: true,
    },
    {
      label: "My Donation Requests",
      href: "/dashboard/my-donation-requests",
      icon: icons.request,
      show: role === "donor" || role === "admin" || role === "volunteer",
    },
    {
      label: "Create Donation Request",
      href: "/dashboard/create-donation-request",
      icon: icons.create,
      show: role === "donor" || role === "admin" || role === "volunteer",
      disabled: status === "blocked",
    },
    {
      label: "All Users",
      href: "/dashboard/all-users",
      icon: icons.users,
      show: role === "admin",
    },
    {
      label: "All Blood Donation Requests",
      href: "/dashboard/all-blood-donation-request",
      icon: icons.request,
      show: role === "admin" || role === "volunteer",
    },
    {
      label: "Funding",
      href: "/funding",
      icon: icons.funding,
      show: role === "admin" || role === "volunteer",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-11 items-center gap-2 rounded-2xl bg-red-600 px-4 text-sm font-bold text-white shadow-lg shadow-red-200 lg:hidden"
      >
        {icons.menu}
        Menu
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-72 shrink-0 flex-col border-r border-red-100 bg-white p-5 lg:flex">
        <SidebarContent
          user={user}
          role={role}
          status={status}
          loading={isPending}
          menuItems={menuItems}
          isActive={isActive}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-950/60"
          />

          <aside className="relative flex h-full w-72 flex-col border-r border-red-100 bg-white p-5 shadow-2xl">
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600"
              >
                {icons.close}
              </button>
            </div>

            <SidebarContent
              user={user}
              role={role}
              status={status}
              loading={isPending}
              menuItems={menuItems}
              isActive={isActive}
              onLogout={handleLogout}
              onNavigate={handleNavigate}
            />
          </aside>
        </div>
      )}
    </>
  );
};

const SidebarContent = ({
  user,
  role,
  status,
  loading,
  menuItems,
  isActive,
  onLogout,
  onNavigate,
}) => {
  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <Link href="/" onClick={onNavigate} className="mb-8 block">
        <h1 className="text-2xl font-black text-red-600">RaktaNex</h1>
        <p className="mt-1 text-xs font-semibold text-slate-400">
          Blood Donation Platform
        </p>
      </Link>

      {/* User Card */}
      <div className="rounded-3xl bg-red-50 p-4">
        <div className="flex items-center gap-3">
          <img
            src={user?.image || "https://i.ibb.co.com/4pDNDk1/avatar.png"}
            alt={user?.name || "User"}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
          />

          <div className="min-w-0">
            <h2 className="truncate text-sm font-black text-slate-900">
              {loading ? "Loading..." : user?.name || "User"}
            </h2>

            <p className="truncate text-xs text-slate-500">
              {user?.email || "No email"}
            </p>

            <p className="mt-1 inline-flex rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-black uppercase text-red-600">
              {role}
            </p>
          </div>
        </div>
      </div>

      {/* Blocked Alert */}
      {status === "blocked" && (
        <div className="mt-4 rounded-2xl bg-red-50 p-3 text-xs font-semibold text-red-600">
          Your account is blocked. You cannot create donation requests.
        </div>
      )}

      {/* Nav */}
      <nav className="mt-8 flex flex-1 flex-col gap-2 overflow-y-auto">
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
                {item.icon}
                <span>{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  isActive(item.href)
                    ? "bg-red-600 text-white shadow-lg shadow-red-100"
                    : "text-slate-700 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          )}
      </nav>

      {/* Logout */}
      <div className="mt-4 border-t border-red-100 pt-4">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-50"
        >
          {icons.logout}
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
