import {
  obtenerEstadisticas,
} from "../services/estadisticas.service.js";

export async function obtenerDashboard(
  req,
  res
) {
  try {
    const resultado =
      await obtenerEstadisticas();

    return res.json({
      ok: true,
      data: resultado,
    });
  } catch (error) {
    console.error(
      "Error al obtener estadísticas:",
      error
    );

    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}