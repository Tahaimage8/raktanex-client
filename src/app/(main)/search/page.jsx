/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaDroplet, FaLocationDot } from "react-icons/fa6";
import { searchDonors } from "@/lib/api/donor";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const getTableData = (data, tableName) => {
  const table = data.find(
    (item) => item.type === "table" && item.name === tableName,
  );

  return table?.data || [];
};

const SearchPage = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // load district + upazila reference data once on page load
  useEffect(() => {
    const loadLocationData = async () => {
      const districtRes = await fetch("/districts.json");
      const upazilaRes = await fetch("/upazilas.json");

      const districtData = await districtRes.json();
      const upazilaData = await upazilaRes.json();

      setDistricts(getTableData(districtData, "districts"));
      setUpazilas(getTableData(upazilaData, "upazilas"));
    };

    loadLocationData();
  }, []);

  // whenever district changes, reset upazila (since it belongs to the old district)
  useEffect(() => {
    setUpazila("");
  }, [district]);

  const filteredUpazilas = upazilas.filter(
    (item) => item.district_id === district,
  );

  const handleSearch = async (event) => {
    event.preventDefault();

    setLoading(true);
    setHasSearched(true);

    const districtInfo = districts.find((item) => item.id === district);
    const upazilaInfo = upazilas.find((item) => item.id === upazila);

    const data = await searchDonors({
      name,
      bloodGroup,
      district: districtInfo?.name,
      upazila: upazilaInfo?.name,
    });

    setDonors(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-red-50 px-4 py-14">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-red-100 px-5 py-2 text-sm font-bold text-red-600">
            <FaMagnifyingGlass />
            Search Donors
          </p>

          <h1 className="mt-5 text-4xl font-black text-slate-900">
            Find a Blood Donor
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Search by blood group, location, or name to find available
            donors near you.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="mt-10 rounded-[2rem] bg-white p-6 shadow-xl shadow-red-100 md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Donor Name
              </label>

              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Search by name"
                className="h-12 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Blood Group
              </label>

              <select
                value={bloodGroup}
                onChange={(event) => setBloodGroup(event.target.value)}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-red-500"
              >
                <option value="">Any blood group</option>

                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                District
              </label>

              <select
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-red-500"
              >
                <option value="">Any district</option>

                {districts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Upazila
              </label>

              <select
                value={upazila}
                onChange={(event) => setUpazila(event.target.value)}
                disabled={!district}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-red-500 disabled:bg-slate-100"
              >
                <option value="">
                  {district ? "Any upazila" : "Select district first"}
                </option>

                {filteredUpazilas.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 h-12 w-full rounded-xl bg-red-600 text-base font-bold text-white shadow-lg shadow-red-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Searching..." : "Search Donors"}
          </button>
        </form>

        <div className="mt-10">
          {!hasSearched && (
            <p className="text-center text-sm text-slate-400">
              Fill the form above and click search to find donors.
            </p>
          )}

          {hasSearched && !loading && donors.length === 0 && (
            <p className="text-center text-sm font-bold text-slate-500">
              No donors found matching your search.
            </p>
          )}

          {donors.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {donors.map((donor) => (
                <div
                  key={donor._id}
                  className="rounded-3xl bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={donor.image}
                      alt={donor.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-black text-slate-900">
                        {donor.name}
                      </h3>
                      <p className="truncate text-xs text-slate-500">
                        {donor.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <FaDroplet className="text-red-600" />
                    <span className="font-black text-red-600">
                      {donor.bloodGroup}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <FaLocationDot className="text-slate-400" />
                    <span>
                      {donor.district}, {donor.upazila}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchPage;