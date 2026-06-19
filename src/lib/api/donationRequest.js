const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getOwnDonationRequest = async (requesterId, donationStatus = "") => {
  let url = `${baseUrl}/api/myDonations?requesterId=${requesterId}`;

  if (donationStatus) {
    url = `${url}&donationStatus=${donationStatus}`;
  }

  const res = await fetch(url);

  return res.json();
};