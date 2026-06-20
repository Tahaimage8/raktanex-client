const API_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const fetchAllFunds = async () => {
  const res = await fetch(`${API_URL}/api/funds`);
  const data = await res.json();
  return data;
};

// Total fund fetch
export const fetchTotalFunds = async () => {
  const res = await fetch(`${API_URL}/api/funds/total`);
  const data = await res.json();
  return data.total;
};