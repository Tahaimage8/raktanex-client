import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// post donation
export const createDonationRequest = async (data) => {
  const { data: token } = await authClient.token();

  const res = await fetch(`${baseUrl}/api/donation-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
// upgrade donation
export const updateDonationRequest = async (id, requesterId, data) => {
  const { data: token } = await authClient.token();
  const res = await fetch(
    `${baseUrl}/api/donation-request/${id}?requesterId=${requesterId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token.token}`,
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
    },
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
    },
  );

  return res.json();
};

// confirm DOnation Request
export const confirmDonationRequest = async (id, donorInfo) => {
  const res = await fetch(`${baseUrl}/api/donation-requests/${id}/donate`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(donorInfo),
  });

  return res.json();
};

// admin/volunteer: update status
export const updateDonationStatusAsAdmin = async (id, donationStatus) => {
  const { data: token } = await authClient.token();
  const res = await fetch(
    `${baseUrl}/api/admin/donation-requests/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify({ donationStatus }),
    },
  );

  return res.json();
};

// admin/volunteer: delete ANY donation request
export const deleteDonationRequestAsAdmin = async (id) => {
  const { data: token } = await authClient.token();
  const res = await fetch(`${baseUrl}/api/admin/donation-requests/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token.token}`,
    },
  });

  return res.json();
};
export const updateDonationRequestByAdmin = async (id, data) => {
  const { data: token } = await authClient.token();
  const res = await fetch(`${baseUrl}/api/admin/donation-request/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
