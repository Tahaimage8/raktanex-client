const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// post donation
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
// upgrade donation
export const updateDonationRequest = async (id, requesterId, data) => {
  const res = await fetch(
    `${baseUrl}/api/donation-request/${id}?requesterId=${requesterId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return res.json();
};
// delete donation
export const deleteDonationRequest = async (id, requesterId) => {
  const res = await fetch(
    `${baseUrl}/api/donation-request/${id}?requesterId=${requesterId}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
};

// update donation status 

export const updateDonationStatus = async (id, requesterId, donationStatus) => {
  const res = await fetch(
    `${baseUrl}/api/donation-request-status/${id}?requesterId=${requesterId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ donationStatus }),
    }
  );

  return res.json();
};