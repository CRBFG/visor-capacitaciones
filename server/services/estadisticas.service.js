import supabase from "../config/database.js";

export async function obtenerEstadisticas() {
  const { data: visitas, error } = await supabase
    .from("visitas")
    .select(`
      id,
      motivo_acceso,
      fecha_inicio,
      fecha_fin,
      ultima_diapositiva,
      tiempo_visualizacion,
      estado,
      visitantes (
        nombre_completo,
        tipo_procedencia,
        departamento,
        filial,
        cargo
      ),
      capacitaciones (
        titulo
      )
    `)
    .order("fecha_inicio", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `Error al obtener estadísticas: ${error.message}`
    );
  }

  const totalVisitas = visitas.length;

  const inicioHoy = new Date();
  inicioHoy.setHours(0, 0, 0, 0);

  const visitasHoy = visitas.filter(
    (visita) =>
      new Date(visita.fecha_inicio) >= inicioHoy
  ).length;

  const bomberoForestal = visitas.filter(
    (visita) =>
      visita.capacitaciones?.titulo ===
      "Bombero Forestal"
  ).length;

  const gestionEmergencias = visitas.filter(
    (visita) =>
      visita.capacitaciones?.titulo ===
      "Gestión de Emergencias"
  ).length;

  return {
    resumen: {
      totalVisitas,
      visitasHoy,
      bomberoForestal,
      gestionEmergencias,
    },
    visitas,
  };
}