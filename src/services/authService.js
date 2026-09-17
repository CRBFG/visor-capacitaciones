import axios from "axios";

const API_URL = "http://localhost:3000/api";

const TOKEN_KEY = "admin_token";

export async function loginAdministrador(
  username,
  password
) {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    {
      username,
      password,
    }
  );

  const token = response.data.data.token;

  sessionStorage.setItem(
    TOKEN_KEY,
    token
  );

  return response.data;
}

export function getAdminToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function logoutAdministrador() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function administradorAutenticado() {
  return Boolean(getAdminToken());
}