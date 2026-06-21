import { authClient } from "../auth-client";

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
  const { data: token } = await authClient.token();

  let url = `${baseUrl}/api/users?page=${page}&limit=${limit}`;

  if (status && status !== "all") {
    url += `&status=${status}`;
  }

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token.token}`,
    },
  });

  return res.json();
};
export const getAllUsersVolente = async () => {
  const { data: token } = await authClient.token();
 
  const res = await fetch(`${baseUrl}/api/users/vole`, {
    headers: {
      authorization: `Bearer ${token.token}`,
    },
  });
 
  return res.json();
};

//  update user status
export const updateUserStatus = async (id, status) => {
  const { data: token } = await authClient.token();

  const res = await fetch(`${baseUrl}/api/users/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
};

// update user role
export const updateUserRole = async (id, role) => {
  const { data: token } = await authClient.token();
  const res = await fetch(`${baseUrl}/api/users/${id}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify({ role }),
  });

  return res.json();
};
