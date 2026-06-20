/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { authClient } from "@/lib/auth-client";
import {
  FaUpload,
  FaCircleCheck,
  FaTriangleExclamation,
  FaUserPlus,
} from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const inputClass =
  "h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none focus:border-red-500 disabled:bg-slate-100";

const getTableData = (data, tableName) => {
  const table = data.find(
    (item) => item.type === "table" && item.name === tableName
  );

  return table?.data || [];
};

const Toast = ({ toast }) => (
  <AnimatePresence>
    {toast && (
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="fixed right-5 top-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-red-100 bg-white p-4 shadow-xl"
      >
        <div
          className={`text-xl ${
            toast.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {toast.type === "success" ? (
            <FaCircleCheck />
          ) : (
            <FaTriangleExclamation />
          )}
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900">{toast.title}</h4>
          <p className="text-sm text-slate-500">{toast.message}</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const RegisterContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrlFromParams = searchParams.get("callbackUrl");
  const callbackUrl = callbackUrlFromParams?.startsWith("/")
    ? callbackUrlFromParams
    : "/";

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [toast, setToast] = useState(null);
  const [fileName, setFileName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  const filteredDistricts = districts.filter(
    (district) => district.division_id === selectedDivision
  );

  const filteredUpazilas = upazilas.filter(
    (upazila) => upazila.district_id === selectedDistrict
  );

  const showToast = (type, title, message) => {
    setToast({ type, title, message });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  useEffect(() => {
    const loadData = async () => {
      const divisionRes = await fetch("/divisions.json");
      const districtRes = await fetch("/districts.json");
      const upazilaRes = await fetch("/upazilas.json");

      const divisionData = await divisionRes.json();
      const districtData = await districtRes.json();
      const upazilaData = await upazilaRes.json();

      setDivisions(getTableData(divisionData, "divisions"));
      setDistricts(getTableData(districtData, "districts"));
      setUpazilas(getTableData(upazilaData, "upazilas"));
    };

    loadData();
  }, []);

  useEffect(() => {
    setValue("district", "");
    setValue("upazila", "");
  }, [selectedDivision, setValue]);

  useEffect(() => {
    setValue("upazila", "");
  }, [selectedDistrict, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setLoadingText("Uploading image...");

    const imageFile = data.avatar[0];

    const imageData = new FormData();
    imageData.append("image", imageFile);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`;

    const imageUploadRes = await fetch(imageUploadUrl, {
      method: "POST",
      body: imageData,
    });

    const imageUploadData = await imageUploadRes.json();
    const avatarUrl = imageUploadData.data.display_url;

    const divisionInfo = divisions.find(
      (division) => division.id === data.division
    );

    const districtInfo = districts.find(
      (district) => district.id === data.district
    );

    const upazilaInfo = upazilas.find(
      (upazila) => upazila.id === data.upazila
    );

    setLoadingText("Creating account...");

    const authResult = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      image: avatarUrl,

      bloodGroup: data.bloodGroup,
      division: divisionInfo?.name,
      district: districtInfo?.name,
      upazila: upazilaInfo?.name,
    });

    if (authResult?.error) {
      showToast("error", "Registration failed", authResult.error.message);
      setLoading(false);
      setLoadingText("");
      return;
    }

    showToast(
      "success",
      "Registration successful",
      "Your donor account is ready."
    );

    reset();
    setFileName("");
    setAvatarPreview("");
    setLoading(false);
    setLoadingText("");

    await authClient.signOut();

    setTimeout(() => {
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-red-50 px-4 py-14">
      <Toast toast={toast} />

      <section className="mx-auto w-full max-w-5xl rounded-[2rem] bg-white p-8 shadow-2xl shadow-red-100 md:p-10">
        <div className="mb-10 text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-red-100 px-5 py-2 text-sm font-bold text-red-600">
            <FaUserPlus />
            Donor Registration
          </p>

          <h1 className="mt-5 text-4xl font-black text-slate-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Your role will be donor and status will be active by default.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {loading && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-600">
              {loadingText}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="w-full">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Name
              </label>

              <input
                {...register("name", { required: "Name is required" })}
                disabled={loading}
                placeholder="Enter your name"
                className={inputClass}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Email
              </label>

              <input
                {...register("email", { required: "Email is required" })}
                disabled={loading}
                type="email"
                placeholder="Enter your email"
                className={inputClass}
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Avatar
            </label>

            <label
              className={`flex items-center justify-center gap-3 rounded-2xl border border-dashed border-red-300 bg-red-50 p-8 text-sm font-bold text-red-600 transition ${
                loading
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer hover:bg-red-100"
              }`}
            >
              <FaUpload className="text-lg" />
              {fileName || "Upload profile image"}

              <input
                type="file"
                accept="image/*"
                disabled={loading}
                className="hidden"
                {...register("avatar", {
                  required: "Avatar is required",
                  onChange: (event) => {
                    const image = event.target.files?.[0];

                    if (image) {
                      setFileName(image.name);
                      setAvatarPreview(URL.createObjectURL(image));
                    }
                  },
                })}
              />
            </label>

            {avatarPreview && (
              <div className="mt-5 flex justify-center">
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="h-28 w-28 rounded-full border-4 border-red-100 object-cover shadow-md"
                />
              </div>
            )}

            {errors.avatar && (
              <p className="mt-1 text-xs text-red-600">
                {errors.avatar.message}
              </p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="w-full">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Blood Group
              </label>

              <select
                {...register("bloodGroup", {
                  required: "Blood group is required",
                })}
                disabled={loading}
                className={inputClass}
              >
                <option value="">Select blood group</option>

                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>

              {errors.bloodGroup && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.bloodGroup.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Division
              </label>

              <select
                {...register("division", {
                  required: "Division is required",
                })}
                disabled={loading}
                className={inputClass}
              >
                <option value="">Select division</option>

                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>

              {errors.division && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.division.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="w-full">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                District
              </label>

              <select
                {...register("district", {
                  required: "District is required",
                })}
                disabled={!selectedDivision || loading}
                className={inputClass}
              >
                <option value="">
                  {selectedDivision
                    ? "Select district"
                    : "Select division first"}
                </option>

                {filteredDistricts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>

              {errors.district && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.district.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Upazila
              </label>

              <select
                {...register("upazila", {
                  required: "Upazila is required",
                })}
                disabled={!selectedDistrict || loading}
                className={inputClass}
              >
                <option value="">
                  {selectedDistrict
                    ? "Select upazila"
                    : "Select district first"}
                </option>

                {filteredUpazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.id}>
                    {upazila.name}
                  </option>
                ))}
              </select>

              {errors.upazila && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.upazila.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="w-full">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Password
              </label>

              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                disabled={loading}
                type="password"
                placeholder="Enter password"
                className={inputClass}
              />

              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Confirm Password
              </label>

              <input
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                disabled={loading}
                type="password"
                placeholder="Confirm password"
                className={inputClass}
              />

              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-red-600 text-base font-bold text-white shadow-lg shadow-red-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? loadingText : "Create Account"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="font-bold text-red-600"
            >
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

const RegisterPage = () => {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-red-50 px-4 py-14">
          <section className="mx-auto w-full max-w-5xl rounded-[2rem] bg-white p-8 shadow-2xl shadow-red-100 md:p-10">
            <p className="text-sm font-bold text-red-600">Loading...</p>
          </section>
        </main>
      }
    >
      <RegisterContent />
    </Suspense>
  );
};

export default RegisterPage;