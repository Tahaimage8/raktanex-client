const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
 

export const searchDonors = async ({ name, bloodGroup, district, upazila }) => {
  const params = new URLSearchParams();
 
  if (name) params.append("name", name);
  if (bloodGroup) params.append("bloodGroup", bloodGroup);
  if (district) params.append("district", district);
  if (upazila) params.append("upazila", upazila);
 
  const res = await fetch(`${baseUrl}/api/donors?${params.toString()}`);
 
  return res.json();
};
 