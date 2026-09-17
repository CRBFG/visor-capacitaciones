import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  finalizarVisita,
  abandonarVisita,
} from "../services/VisitasService";

import ViewerProtection from "./ViewerProtection";

function PresentationViewer({
  capacitacion,
  visitor,
  visitaId,
  onExit,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const viewerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const inicioVisitaRef = useRef(Date.now());
  const finalizadaRef = useRef(false);
  const abandonoProcesadoRef = useRef(false);

  const totalSlides =
    capacitacion.diapositivas.length;

  const currentImage =
    capacitacion.diapositivas[currentSlide];

  const nextImage =
    currentSlide < totalSlides - 1
      ? capacitacion.diapositivas[
          currentSlide + 1
        ]
      : null;

  const previousImage =
    currentSlide > 0
      ? capacitacion.diapositivas[
          currentSlide - 1
        ]
      : null;

  const goNext = () => {
    setCurrentSlide((current) =>
      Math.min(
        current + 1,
        totalSlides - 1
      )
    );
  };

  const goPrevious = () => {
    setCurrentSlide((current) =>
      Math.max(current - 1, 0)
    );
  };

  /*
   * SALIDA NORMAL
   * Botón "Salir" o tecla ESC.
   */
  const finalizarVisitaActual = async () => {
    if (
      !visitaId ||
      finalizadaRef.current
    ) {
      onExit();
      return;
    }

    finalizadaRef.current = true;

    const tiempoVisualizacion =
      Math.floor(
        (Date.now() -
          inicioVisitaRef.current) /
          1000
      );

    try {
      await finalizarVisita(
        visitaId,
        {
          ultimaDiapositiva:
            currentSlide + 1,
          tiempoVisualizacion,
        }
      );
    } catch (error) {
      console.error(
        "No se pudo finalizar la visita:",
        error
      );
    }

    onExit();
  };

  /*
   * SALIDA INESPERADA
   * Cerrar pestaña, recargar o abandonar la página.
   */
  const abandonarVisitaActual = () => {
    if (
      !visitaId ||
      finalizadaRef.current ||
      abandonoProcesadoRef.current
    ) {
      return;
    }

    abandonoProcesadoRef.current = true;

    const tiempoVisualizacion =
      Math.floor(
        (Date.now() -
          inicioVisitaRef.current) /
          1000
      );

    abandonarVisita(
      visitaId,
      {
        ultimaDiapositiva:
          currentSlide + 1,
        tiempoVisualizacion,
      }
    );
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await viewerRef.current?.requestFullscreen();
      } catch (error) {
        console.error(
          "No se pudo activar pantalla completa:",
          error
        );
      }
    } else {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.error(
          "No se pudo salir de pantalla completa:",
          error
        );
      }
    }
  };

  /*
   * Detectar salida inesperada de la página.
   */
  useEffect(() => {
    const handlePageHide = () => {
      abandonarVisitaActual();
    };

    window.addEventListener(
      "pagehide",
      handlePageHide
    );

    return () => {
      window.removeEventListener(
        "pagehide",
        handlePageHide
      );
    };
  }, [
    visitaId,
    currentSlide,
  ]);

  /*
   * Pantalla completa.
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        Boolean(
          document.fullscreenElement
        )
      );
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  /*
   * Precargar siguiente diapositiva.
   */
  useEffect(() => {
    if (!nextImage) return;

    const image = new Image();
    image.src = nextImage;
  }, [nextImage]);

  /*
   * Precargar diapositiva anterior.
   */
  useEffect(() => {
    if (!previousImage) return;

    const image = new Image();
    image.src = previousImage;
  }, [previousImage]);

  /*
   * Teclado.
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "ArrowRight" ||
        event.key === " "
      ) {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === "Escape") {
        if (document.fullscreenElement) {
          return;
        }

        finalizarVisitaActual();
      }

      if (
        event.key.toLowerCase() === "f"
      ) {
        event.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    onExit,
    totalSlides,
    visitaId,
    currentSlide,
  ]);

  const handleTouchStart = (event) => {
    const touch =
      event.changedTouches[0];

    touchStartX.current =
      touch.clientX;

    touchStartY.current =
      touch.clientY;
  };

  const handleTouchEnd = (event) => {
    if (
      touchStartX.current === null
    ) {
      return;
    }

    const touch =
      event.changedTouches[0];

    const deltaX =
      touch.clientX -
      touchStartX.current;

    const deltaY =
      touch.clientY -
      touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    const minimumSwipeDistance = 50;

    if (
      Math.abs(deltaX) <
        minimumSwipeDistance ||
      Math.abs(deltaX) <
        Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  const getMotivoLabel = () => {
    switch (visitor?.motivoAcceso) {
      case "CAPACITACION":
        return "Capacitación";

      case "REPASO":
        return "Repaso / actualización";

      case "CONSULTA":
        return "Consulta de material";

      case "EVALUACION":
        return "Evaluación";

      case "OTRO":
        return "Otro";

      default:
        return "No especificado";
    }
  };

  const getProcedenciaLabel = () => {
    if (!visitor) {
      return "No especificada";
    }

    if (
      visitor.tipoProcedencia ===
      "nacional"
    ) {
      return "Nacional";
    }

    if (
      visitor.tipoProcedencia ===
      "departamental"
    ) {
      return visitor.filial ||
        visitor.departamento
        ? visitor.filial ||
          `Filial Departamental ${visitor.departamento}`
        : "Filial Departamental";
    }

    if (
      visitor.tipoProcedencia ===
      "municipal"
    ) {
      return (
        visitor.filial ||
        "Filial Municipal"
      );
    }

    return (
      visitor.filial ||
      "No especificada"
    );
  };

  return (
    <main
      ref={viewerRef}
      className={`viewer ${
        isFullscreen
          ? "viewer--fullscreen"
          : ""
      }`}
    >
      <ViewerProtection />

      <header className="viewer__header">
        <button
          type="button"
          className="viewer__exit"
          onClick={
            finalizarVisitaActual
          }
        >
          ← Salir
        </button>

        <div className="viewer__title">
          <strong>
            {capacitacion.titulo}
          </strong>
        </div>

        <div className="viewer__actions">
          <div className="viewer__counter">
            {currentSlide + 1} /{" "}
            {totalSlides}
          </div>

          <button
            type="button"
            className="viewer__fullscreen"
            onClick={toggleFullscreen}
            aria-label={
              isFullscreen
                ? "Salir de pantalla completa"
                : "Entrar de pantalla completa"
            }
            title={
              isFullscreen
                ? "Salir de pantalla completa"
                : "Pantalla completa"
            }
          >
            ⛶
          </button>
        </div>
      </header>

      <section
        className="viewer__content"
        onTouchStart={
          handleTouchStart
        }
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className="viewer__navigation viewer__navigation--previous"
          onClick={goPrevious}
          disabled={
            currentSlide === 0
          }
          aria-label="Diapositiva anterior"
        >
          ‹
        </button>

        <div className="viewer__slide">
          <img
            src={currentImage}
            alt={`Diapositiva ${
              currentSlide + 1
            }`}
            draggable="false"
          />

          <div className="viewer__watermark">
            <strong>
              Visitante:{" "}
              {visitor?.nombre ||
                "Visitante"}
            </strong>

            <span>
              Desde:{" "}
              {getProcedenciaLabel()}
            </span>

            <small>
              Motivo:{" "}
              {getMotivoLabel()}
            </small>
          </div>
        </div>

        <button
          type="button"
          className="viewer__navigation viewer__navigation--next"
          onClick={goNext}
          disabled={
            currentSlide ===
            totalSlides - 1
          }
          aria-label="Siguiente diapositiva"
        >
          ›
        </button>
      </section>

      <footer className="viewer__footer">
        <div className="viewer__footer-institution">
          <span>
            Material de capacitación
          </span>

          <strong>
            Cruz Roja Boliviana · Filial
            Guayaramerín
          </strong>
        </div>

        <div className="viewer__footer-developer">
          <span>
            Plataforma desarrollada por
          </span>

          <strong>
            Silvestre Mauricio Melgar
            Coimbra
          </strong>
        </div>
      </footer>
    </main>
  );
}

export default PresentationViewer;