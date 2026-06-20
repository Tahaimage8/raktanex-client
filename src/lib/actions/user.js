const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const updateUserProfile = async (id, data) => {
  const res = await fetch(`${baseUrl}/api/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};