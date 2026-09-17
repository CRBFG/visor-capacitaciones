import {
  crearVisita,
  finalizarVisita,
  abandonarVisita,
} from "../services/visitas.service.js";

export async function registrarVisita(req, res) {
  try {
    const {
      nombreCompleto,
      tipoProcedencia,
      departamento,
      filial,
      cargo,
      idCapacitacion,
      motivoAcceso,
    } = req.body;

    if (
      !nombreCompleto ||
      !tipoProcedencia ||
      !filial ||
      !idCapacitacion ||
      !motivoAcceso
    ) {
      return res.status(400).json({
        ok: false,
        message:
          "Faltan datos obligatorios para registrar la visita.",
      });
    }

    const resultado = await crearVisita({
      nombreCompleto,
      tipoProcedencia,
      departamento,
      filial,
      cargo,
      idCapacitacion,
      motivoAcceso,
    });

    return res.status(201).json({
      ok: true,
      message:
        "Visita registrada correctamente.",
      data: resultado,
    });
  } catch (error) {
    console.error(
      "Error al registrar visita:",
      error
    );

    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}

export async function cerrarVisita(req, res) {
  try {
    const { id } = req.params;

    const {
      ultimaDiapositiva,
      tiempoVisualizacion,
    } = req.body;

    if (!ultimaDiapositiva) {
      return res.status(400).json({
        ok: false,
        message:
          "La última diapositiva es obligatoria.",
      });
    }

    const visita = await finalizarVisita(
      id,
      {
        ultimaDiapositiva,
        tiempoVisualizacion,
      }
    );

    return res.json({
      ok: true,
      message:
        "Visita finalizada correctamente.",
      data: visita,
    });
  } catch (error) {
    console.error(
      "Error al finalizar visita:",
      error
    );

    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}

export async function marcarVisitaAbandonada(
  req,
  res
) {
  try {
    const { id } = req.params;

    const {
      ultimaDiapositiva,
      tiempoVisualizacion,
    } = req.body;

    if (!ultimaDiapositiva) {
      return res.status(400).json({
        ok: false,
        message:
          "La última diapositiva es obligatoria.",
      });
    }

    const visita =
      await abandonarVisita(id, {
        ultimaDiapositiva,
        tiempoVisualizacion,
      });

    return res.json({
      ok: true,
      message:
        "Visita marcada como abandonada.",
      data: visita,
    });
  } catch (error) {
    console.error(
      "Error al marcar visita como abandonada:",
      error
    );

    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}
