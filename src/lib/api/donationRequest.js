const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getOwnDonationRequest = async (requesterId, donationStatus = "") => {
  let url = `${baseUrl}/api/myDonations?requesterId=${requesterId}`;

  if (donationStatus) {
    url = `${url}&donationStatus=${donationStatus}`;
  }

  const res = await fetch(url);

  return res.json();
};

export const getDonationRequestById = async (id, requesterId) => {
  const res = await fetch(
    `${baseUrl}/api/donation-request/${id}?requesterId=${requesterId}`
  );

  return res.json();
};

// donation-request public api
export const getPendingDonationRequests = async () => {
  const res = await fetch(`${baseUrl}/api/donation-requests`);

  return res.json();
};
// donation-request single data private api
export const getPublicDonationRequestById = async (id) => {
  const res = await fetch(`${baseUrl}/api/donation-requests/${id}`);

  return res.json();
};