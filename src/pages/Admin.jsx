import { useEffect, useMemo, useState } from "react";

import {
  obtenerEstadisticas,
} from "../services/estadisticasService";

function formatearFecha(fecha) {
  if (!fecha) return "—";

  return new Date(fecha).toLocaleDateString(
    "es-BO",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
}

function formatearHora(fecha) {
  if (!fecha) return "—";

  return new Date(fecha).toLocaleTimeString(
    "es-BO",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );
}

function formatearTiempo(segundos) {
  if (
    segundos === null ||
    segundos === undefined
  ) {
    return "En curso";
  }

  const horas = Math.floor(
    segundos / 3600
  );

  const minutos = Math.floor(
    (segundos % 3600) / 60
  );

  const segundosRestantes =
    segundos % 60;

  if (horas > 0) {
    return `${String(horas).padStart(
      2,
      "0"
    )}:${String(minutos).padStart(
      2,
      "0"
    )}:${String(
      segundosRestantes
    ).padStart(2, "0")}`;
  }

  return `${String(minutos).padStart(
    2,
    "0"
  )}:${String(
    segundosRestantes
  ).padStart(2, "0")}`;
}

function Admin({ onLogout }) {
  const [estadisticas, setEstadisticas] =
    useState(null);

  const [cargando, setCargando] =
    useState(true);

  const [error, setError] =
    useState("");

  const [busqueda, setBusqueda] =
    useState("");

  const [
    filtroCapacitacion,
    setFiltroCapacitacion,
  ] = useState("TODAS");

  const [
    filtroEstado,
    setFiltroEstado,
  ] = useState("TODOS");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resultado =
          await obtenerEstadisticas();

        setEstadisticas(
          resultado.data
        );
      } catch (error) {
        console.error(
          "Error al cargar estadísticas:",
          error
        );

        setError(
          "No fue posible cargar las estadísticas."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const visitasFiltradas = useMemo(() => {
    if (!estadisticas) {
      return [];
    }

    return estadisticas.visitas.filter(
      (visita) => {
        const nombre =
          visita.visitantes
            ?.nombre_completo
            ?.toLowerCase() || "";

        const capacitacion =
          visita.capacitaciones
            ?.titulo || "";

        const estado =
          visita.estado || "";

        const coincideBusqueda =
          nombre.includes(
            busqueda.toLowerCase()
          );

        const coincideCapacitacion =
          filtroCapacitacion === "TODAS" ||
          capacitacion ===
            filtroCapacitacion;

        const coincideEstado =
          filtroEstado === "TODOS" ||
          estado === filtroEstado;

        return (
          coincideBusqueda &&
          coincideCapacitacion &&
          coincideEstado
        );
      }
    );
  }, [
    estadisticas,
    busqueda,
    filtroCapacitacion,
    filtroEstado,
  ]);

  if (cargando) {
    return (
      <main className="admin-page">
        <p>
          Cargando estadísticas...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="admin-page">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <span className="home__eyebrow">
            ADMINISTRACIÓN
          </span>

          <h1>
            Estadísticas de capacitaciones
          </h1>

          <p>
            Resumen de las visitas registradas
            en la plataforma.
          </p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="admin-logout"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="admin-stats">
        <article className="admin-stat">
          <span>
            Visitas totales
          </span>

          <strong>
            {
              estadisticas.resumen
                .totalVisitas
            }
          </strong>
        </article>

        <article className="admin-stat">
          <span>
            Visitas de hoy
          </span>

          <strong>
            {
              estadisticas.resumen
                .visitasHoy
            }
          </strong>
        </article>

        <article className="admin-stat">
          <span>
            Bombero Forestal
          </span>

          <strong>
            {
              estadisticas.resumen
                .bomberoForestal
            }
          </strong>
        </article>

        <article className="admin-stat">
          <span>
            Gestión de Emergencias
          </span>

          <strong>
            {
              estadisticas.resumen
                .gestionEmergencias
            }
          </strong>
        </article>
      </section>

      <section className="admin-visitas">
        <div className="admin-section-header">
          <div>
            <h2>
              Visitas registradas
            </h2>

            <span>
              Mostrando{" "}
              {
                visitasFiltradas.length
              }{" "}
              de{" "}
              {
                estadisticas.visitas
                  .length
              }{" "}
              registros
            </span>
          </div>
        </div>

        <div className="admin-filters">
          <div className="admin-filter">
            <label htmlFor="busqueda">
              Buscar visitante
            </label>

            <input
              id="busqueda"
              type="text"
              value={busqueda}
              onChange={(event) =>
                setBusqueda(
                  event.target.value
                )
              }
              placeholder="Nombre del visitante"
            />
          </div>

          <div className="admin-filter">
            <label htmlFor="capacitacion">
              Capacitación
            </label>

            <select
              id="capacitacion"
              value={
                filtroCapacitacion
              }
              onChange={(event) =>
                setFiltroCapacitacion(
                  event.target.value
                )
              }
            >
              <option value="TODAS">
                Todas
              </option>

              <option value="Bombero Forestal">
                Bombero Forestal
              </option>

              <option value="Gestión de Emergencias">
                Gestión de Emergencias
              </option>
            </select>
          </div>

          <div className="admin-filter">
            <label htmlFor="estado">
              Estado
            </label>

            <select
              id="estado"
              value={filtroEstado}
              onChange={(event) =>
                setFiltroEstado(
                  event.target.value
                )
              }
            >
              <option value="TODOS">
                Todos
              </option>

              <option value="ACTIVA">
                Activa
              </option>

              <option value="FINALIZADA">
                Finalizada
              </option>

              <option value="ABANDONADA">
                Abandonada
              </option>
            </select>
          </div>

          <button
            type="button"
            className="admin-filter-clear"
            onClick={() => {
              setBusqueda("");
              setFiltroCapacitacion(
                "TODAS"
              );
              setFiltroEstado("TODOS");
            }}
          >
            Limpiar filtros
          </button>
        </div>

        {visitasFiltradas.length === 0 ? (
          <p className="admin-empty">
            No se encontraron visitas con
            los filtros seleccionados.
          </p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Visitante</th>
                  <th>Capacitación</th>
                  <th>Procedencia</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Tiempo</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                {visitasFiltradas.map(
                  (visita) => (
                    <tr key={visita.id}>
                      <td>
                        {
                          visita.visitantes
                            ?.nombre_completo
                        }
                      </td>

                      <td>
                        {
                          visita.capacitaciones
                            ?.titulo
                        }
                      </td>

                      <td>
                        {visita.visitantes
                          ?.filial ||
                          visita.visitantes
                            ?.departamento ||
                          visita.visitantes
                            ?.tipo_procedencia}
                      </td>

                      <td>
                        {formatearFecha(
                          visita.fecha_inicio
                        )}
                      </td>

                      <td>
                        {formatearHora(
                          visita.fecha_inicio
                        )}
                      </td>

                      <td>
                        {formatearTiempo(
                          visita.tiempo_visualizacion
                        )}
                      </td>

                      <td>
                        {visita.estado}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Admin;