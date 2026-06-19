"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const DashboardPage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const role = user?.role || "donor";

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [isPending, user, router]);

  if (isPending) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-bold text-red-600">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section>
      <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <p className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-bold capitalize text-red-600">
          {role} Dashboard
        </p>

        <h1 className="mt-5 text-3xl font-black text-slate-900 md:text-4xl">
          Welcome back, {user.name}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Welcome to your RaktaNex dashboard. From here, you can manage your
          profile and donation related activities.
        </p>
      </div>
    </section>
  );
};

export default DashboardPage;