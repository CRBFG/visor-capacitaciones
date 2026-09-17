import axios from "axios";
import { getAdminToken } from "./authService";

const API_URL = "http://localhost:3000/api";

export async function obtenerEstadisticas() {
  const token = getAdminToken();

  const response = await axios.get(
    `${API_URL}/estadisticas`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}