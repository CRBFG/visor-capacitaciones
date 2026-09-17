import supabase from "../config/database.js";

export async function crearVisita(datos) {
  const {
    nombreCompleto,
    tipoProcedencia,
    departamento,
    filial,
    cargo,
    idCapacitacion,
    motivoAcceso,
  } = datos;

  const { data: visitante, error: visitanteError } =
    await supabase
      .from("visitantes")
      .insert({
        nombre_completo: nombreCompleto,
        tipo_procedencia: tipoProcedencia,
        departamento:
          tipoProcedencia === "nacional"
            ? null
            : departamento,
        filial,
        cargo:
          tipoProcedencia === "nacional"
            ? cargo
            : null,
      })
      .select("id")
      .single();

  if (visitanteError) {
    throw new Error(
      `Error al registrar visitante: ${visitanteError.message}`
    );
  }

  const { data: visita, error: visitaError } =
    await supabase
      .from("visitas")
      .insert({
        id_visitante: visitante.id,
        id_capacitacion: idCapacitacion,
        motivo_acceso: motivoAcceso,
      })
      .select(
        "id, id_visitante, id_capacitacion, fecha_inicio, estado"
      )
      .single();

  if (visitaError) {
    throw new Error(
      `Error al registrar visita: ${visitaError.message}`
    );
  }

  return {
    visita,
  };
}

export async function finalizarVisita(
  idVisita,
  datos
) {
  const {
    ultimaDiapositiva,
    tiempoVisualizacion,
  } = datos;

  const { data: visita, error } =
    await supabase
      .from("visitas")
      .update({
        fecha_fin: new Date().toISOString(),
        ultima_diapositiva: ultimaDiapositiva,
        tiempo_visualizacion:
          tiempoVisualizacion,
        estado: "FINALIZADA",
      })
      .eq("id", idVisita)
      .eq("estado", "ACTIVA")
      .select(
        "id, fecha_inicio, fecha_fin, ultima_diapositiva, tiempo_visualizacion, estado"
      )
      .single();

  if (error) {
    throw new Error(
      `Error al finalizar visita: ${error.message}`
    );
  }

  return visita;
}

export async function abandonarVisita(
  idVisita,
  datos
) {
  const {
    ultimaDiapositiva,
    tiempoVisualizacion,
  } = datos;

  const { data: visita, error } =
    await supabase
      .from("visitas")
      .update({
        fecha_fin: new Date().toISOString(),
        ultima_diapositiva: ultimaDiapositiva,
        tiempo_visualizacion:
          tiempoVisualizacion,
        estado: "ABANDONADA",
      })
      .eq("id", idVisita)
      .eq("estado", "ACTIVA")
      .select(
        "id, fecha_inicio, fecha_fin, ultima_diapositiva, tiempo_visualizacion, estado"
      )
      .single();

  if (error) {
    throw new Error(
      `Error al marcar visita como abandonada: ${error.message}`
    );
  }

  return visita;
}