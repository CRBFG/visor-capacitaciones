import { useState } from "react";

import Home from "./pages/Home";
import Viewer from "./pages/Viewer";
import VisitorForm from "./pages/VisitorForm";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

import {
  createVisitorSession,
  clearVisitorSession,
} from "./services/visitorSession";

import { registrarVisita } from "./services/VisitasService";

import {
  administradorAutenticado,
  logoutAdministrador,
} from "./services/authService";

function App() {
  /*
   * PROTECCIÓN DEL PANEL ADMINISTRATIVO
   */
  if (window.location.pathname === "/admin") {
    const autenticado = administradorAutenticado();

    if (!autenticado) {
      return (
        <AdminLogin
          onLogin={() => {
            window.location.reload();
          }}
        />
      );
    }

    return (
      <Admin
        onLogout={() => {
          logoutAdministrador();
          window.location.reload();
        }}
      />
    );
  }

  /*
   * FLUJO PRINCIPAL DEL VISOR
   */
  const [selectedTraining, setSelectedTraining] =
    useState(null);

  const [visitorSession, setVisitorSession] =
    useState(null);

  const [isRegistering, setIsRegistering] =
    useState(false);

  const [registrationError, setRegistrationError] =
    useState("");

  /*
   * Seleccionar capacitación
   */
  const handleSelectTraining = (capacitacion) => {
    setSelectedTraining(capacitacion);
    setVisitorSession(null);
    setRegistrationError("");
  };

  /*
   * Registrar visitante y crear visita
   */
  const handleContinue = async (visitorData) => {
    try {
      setIsRegistering(true);
      setRegistrationError("");

      const resultado = await registrarVisita({
        nombreCompleto: visitorData.nombre,

        tipoProcedencia:
          visitorData.tipoProcedencia,

        departamento:
          visitorData.departamento,

        filial: visitorData.filial,

        cargo: visitorData.cargo,

        idCapacitacion:
          selectedTraining.id ===
          "bombero-forestal"
            ? 1
            : 2,

        motivoAcceso:
          visitorData.motivoAcceso,
      });

      /*
       * Crear sesión temporal del visitante
       */
      const session = createVisitorSession({
        capacitacion: selectedTraining,
        visitor: visitorData,
      });

      /*
       * Guardar ID de la visita registrada
       */
      session.visitaId =
        resultado.data.visita.id;

      sessionStorage.setItem(
        "capacitacion_visitor_session",
        JSON.stringify(session)
      );

      setVisitorSession(session);

    } catch (error) {
      console.error(
        "Error al registrar visita:",
        error
      );

      setRegistrationError(
        error.response?.data?.message ||
          "No fue posible registrar tu acceso. Intenta nuevamente."
      );

    } finally {
      setIsRegistering(false);
    }
  };

  /*
   * Salir del flujo de capacitación
   */
  const handleExit = () => {
    clearVisitorSession();

    setSelectedTraining(null);
    setVisitorSession(null);
    setRegistrationError("");
  };

  /*
   * FORMULARIO DE REGISTRO
   */
  if (
    selectedTraining &&
    !visitorSession
  ) {
    return (
      <VisitorForm
        capacitacion={selectedTraining}
        onContinue={handleContinue}
        onBack={handleExit}
        isRegistering={isRegistering}
        registrationError={registrationError}
      />
    );
  }

  /*
   * VISOR DE CAPACITACIÓN
   */
  if (
    selectedTraining &&
    visitorSession
  ) {
    return (
      <Viewer
        capacitacion={selectedTraining}
        visitor={visitorSession.visitante}
        visitaId={visitorSession.visitaId}
        onExit={handleExit}
      />
    );
  }

  /*
   * INICIO
   */
  return (
    <Home
      onSelect={handleSelectTraining}
    />
  );
}

export default App;