const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createDonationRequest = async (data) => {
  const res = await fetch(`${baseUrl}/api/donation-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};