const SESSION_KEY = "capacitacion_visitor_session";

export function createVisitorSession({
  capacitacion,
  visitor,
}) {
  const session = {
    sessionId: crypto.randomUUID(),
    capacitacionId: capacitacion.id,
    capacitacionTitulo: capacitacion.titulo,

    visitante: {
      nombre: visitor.nombre,
      tipoProcedencia: visitor.tipoProcedencia,
      departamento: visitor.departamento,
      filial: visitor.filial,
      cargo: visitor.cargo,
      motivoAcceso: visitor.motivoAcceso,
    },

    fechaInicio: new Date().toISOString(),
  };

  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );

  return session;
}

export function getVisitorSession() {
  const storedSession =
    sessionStorage.getItem(SESSION_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    return JSON.parse(storedSession);
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearVisitorSession() {
  sessionStorage.removeItem(SESSION_KEY);
}