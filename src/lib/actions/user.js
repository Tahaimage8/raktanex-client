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



 
// get all users  admin only
export const getAllUsers = async (page = 1, limit = 10, status = "") => {
  let url = `${baseUrl}/api/users?page=${page}&limit=${limit}`;
 
  if (status && status !== "all") {
    url += `&status=${status}`;
  }
 
  const res = await fetch(url);
 
  return res.json();
};
 
//  update user status 
export const updateUserStatus = async (id, status) => {
  const res = await fetch(`${baseUrl}/api/users/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
 
  return res.json();
};
 
// update user role 
export const updateUserRole = async (id, role) => {
  const res = await fetch(`${baseUrl}/api/users/${id}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
  });
 
  return res.json();
};