/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Card } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { updateUserProfile } from "@/lib/actions/user";


const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const inputClass =
  "h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-800 outline-none focus:border-red-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const avatarFile = watch("avatar");

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login?callbackUrl=/dashboard/profile");
    }
  }, [isPending, user, router]);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        district: user.district || "",
        upazila: user.upazila || "",
        bloodGroup: user.bloodGroup || "",
      });

      setAvatarPreview(user.image || "");
    }
  }, [user, reset]);

  useEffect(() => {
    const image = avatarFile?.[0];

    if (image) {
      setAvatarPreview(URL.createObjectURL(image));
    }
  }, [avatarFile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const onSubmit = async (data) => {
    if (!user?.id) {
      toast.error("User not found");
      return;
    }

    setLoading(true);

    let imageUrl = user.image || "";

    const imageFile = data.avatar?.[0];

    if (imageFile) {
      const imageData = new FormData();
      imageData.append("image", imageFile);

      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`;

      const imageUploadRes = await fetch(imageUploadUrl, {
        method: "POST",
        body: imageData,
      });

      const imageUploadData = await imageUploadRes.json();

      if (imageUploadData?.data?.display_url) {
        imageUrl = imageUploadData.data.display_url;
      }
    }

    const updatedProfile = {
      name: data.name,
      image: imageUrl,
      district: data.district,
      upazila: data.upazila,
      bloodGroup: data.bloodGroup,
    };

    const result = await updateUserProfile(user.id, updatedProfile);

    if (result.modifiedCount > 0 || result.matchedCount > 0) {
      toast.success("Profile updated successfully");

      reset({
        name: data.name,
        email: user.email,
        district: data.district,
        upazila: data.upazila,
        bloodGroup: data.bloodGroup,
      });

      setAvatarPreview(imageUrl);
      setIsEditing(false);
      setLoading(false);
      router.refresh();

      return;
    }

    toast.error("Profile update failed");
    setLoading(false);
  };

  if (isPending) {
    return (
      <Card className="p-8">
        <p className="text-sm font-bold text-red-600">Loading profile...</p>
      </Card>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section>
      <Card className="rounded-3xl p-6 shadow-sm md:p-8">
        <div className="mb-8 flex flex-col gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-red-500">
              My Profile
            </p>

            <h1 className="mt-3 text-3xl font-black text-slate-900">
              Profile Information
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View and update your RaktaNex account information.
            </p>
          </div>

          {!isEditing ? (
            <Button
              onPress={handleEdit}
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-black text-white hover:bg-red-700"
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              isDisabled={loading}
              onPress={() => {
                setIsEditing(false);

                reset({
                  name: user.name || "",
                  email: user.email || "",
                  district: user.district || "",
                  upazila: user.upazila || "",
                  bloodGroup: user.bloodGroup || "",
                });

                setAvatarPreview(user.image || "");
              }}
              className="rounded-xl bg-slate-200 px-6 py-3 text-sm font-black text-slate-700 hover:bg-slate-300"
            >
              Cancel
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-red-50 p-6">
            <img
              src={
                avatarPreview ||
                "https://i.ibb.co.com/4pDNDk1/avatar-placeholder.png"
              }
              alt="User avatar"
              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
            />

            {isEditing && (
              <div className="w-full max-w-md">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Update Avatar
                </label>

                <input
                  type="file"
                  accept="image/*"
                  disabled={!isEditing || loading}
                  className="w-full rounded-xl border border-dashed border-red-300 bg-white p-4 text-sm font-bold text-red-600 disabled:cursor-not-allowed disabled:bg-slate-100"
                  {...register("avatar")}
                />
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Name
              </label>

              <input
                {...register("name", { required: "Name is required" })}
                disabled={!isEditing || loading}
                className={inputClass}
                placeholder="Enter your name"
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Email
              </label>

              <input
                {...register("email")}
                disabled
                className={inputClass}
                placeholder="Email address"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                District
              </label>

              <input
                {...register("district", { required: "District is required" })}
                disabled={!isEditing || loading}
                className={inputClass}
                placeholder="Enter your district"
              />

              {errors.district && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.district.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Upazila
              </label>

              <input
                {...register("upazila", { required: "Upazila is required" })}
                disabled={!isEditing || loading}
                className={inputClass}
                placeholder="Enter your upazila"
              />

              {errors.upazila && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.upazila.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Blood Group
            </label>

            <select
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
              disabled={!isEditing || loading}
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

          {isEditing && (
            <div className="flex justify-end">
              <Button
                type="submit"
                isDisabled={loading}
                className="rounded-xl bg-red-600 px-8 py-3 text-sm font-black text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </form>
      </Card>
    </section>
  );
};

export default ProfilePage;