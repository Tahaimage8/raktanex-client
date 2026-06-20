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



// only admin volenter can see 
export const getDonationRequestByIdaAdmin = async (id) => {
  const res = await fetch(
    `${baseUrl}/api/admin/donation-requests/${id}`
  );

  return res.json();
};

// donation-request public api
export const getPendingDonationRequests = async (status = "") => {
  let url = `${baseUrl}/api/donation-requests/pending`;

  if (status) {
    url += `?status=${status}`;
  }

  const res = await fetch(url);

  return res.json();
};
// donation-request single data private api
export const getPublicDonationRequestById = async (id) => {
  const res = await fetch(`${baseUrl}/api/donation-requests/${id}`);

  return res.json();
};
