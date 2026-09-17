import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

export async function registrarVisita(datos) {
  const response = await axios.post(
    `${API_URL}/visitas`,
    datos
  );

  return response.data;
}

export async function finalizarVisita(
  idVisita,
  datos
) {
  const response = await axios.patch(
    `${API_URL}/visitas/${idVisita}/finalizar`,
    datos
  );

  return response.data;
}

export function abandonarVisita(
  idVisita,
  datos
) {
  const url =
    `${API_URL}/visitas/${idVisita}/abandonar`;

  const blob = new Blob(
    [JSON.stringify(datos)],
    {
      type: "application/json",
    }
  );

  return navigator.sendBeacon(url, blob);
}