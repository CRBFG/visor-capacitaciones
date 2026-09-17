import { capacitaciones } from "../data/capacitaciones";

function Home({ onSelect }) {
  const totalCapacitaciones = capacitaciones.length;

  const totalDiapositivas = capacitaciones.reduce(
    (total, capacitacion) =>
      total + capacitacion.diapositivas.length,
    0
  );

  const abrirWhatsApp = (numero) => {
    window.open(
      `https://wa.me/591${numero}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="home">
      {/* =========================================
          HERO INSTITUCIONAL
          ========================================= */}

      <section className="home__hero">
        <div className="home__hero-content">
          <span className="home__eyebrow">
            PLATAFORMA INSTITUCIONAL
          </span>

          <div className="home__institution">
            <span>Cruz Roja Boliviana</span>
            <strong>Filial Guayaramerín</strong>
          </div>

          <h1>
            Visor de
            <span> Capacitaciones</span>
          </h1>

          <p className="home__hero-description">
            Espacio digital para la visualización y consulta
            de material de capacitación institucional.
          </p>

          <a
            href="#capacitaciones"
            className="home__hero-button"
          >
            Explorar capacitaciones
            <span>→</span>
          </a>
        </div>

        <div className="home__hero-info">
          <div className="home__hero-info-item">
            <strong>{totalCapacitaciones}</strong>
            <span>Capacitaciones</span>
          </div>

          <div className="home__hero-info-divider" />

          <div className="home__hero-info-item">
            <strong>{totalDiapositivas}</strong>
            <span>Diapositivas</span>
          </div>

          <div className="home__hero-info-divider" />

          <div className="home__hero-info-item">
            <strong>Web</strong>
            <span>Acceso multidispositivo</span>
          </div>
        </div>
      </section>

      {/* =========================================
          PRESENTACIÓN
          ========================================= */}

      <section className="home__intro">
        <span className="home__section-label">
          FORMACIÓN Y CONOCIMIENTO
        </span>

        <h2>
          Material institucional al alcance
        </h2>

        <p>
          Consulta material preparado para apoyar
          procesos de formación, actualización y
          fortalecimiento de conocimientos dentro de
          la institución.
        </p>
      </section>

      {/* =========================================
          CAPACITACIONES
          ========================================= */}

      <section
        id="capacitaciones"
        className="home__trainings"
      >
        <div className="home__section-header">
          <div>
            <span className="home__section-label">
              MATERIAL DISPONIBLE
            </span>

            <h2>
              Capacitaciones
            </h2>
          </div>

          <p>
            Selecciona un material para comenzar.
          </p>
        </div>

        <div className="home__list">
          {capacitaciones.map((capacitacion, index) => (
            <article
              className="training-card"
              key={capacitacion.id}
            >
              <div className="training-card__top">
                <span className="training-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="training-card__number">
                  {capacitacion.diapositivas.length} diapositivas
                </span>
              </div>

              <div className="training-card__content">
                <h3>
                  {capacitacion.titulo}
                </h3>

                <p>
                  {capacitacion.descripcion}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    onSelect(capacitacion)
                  }
                >
                  Ingresar a capacitación
                  <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================
          SOBRE EL VISOR
          ========================================= */}

      <section className="home__about">
        <div className="home__about-heading">
          <span className="home__section-label">
            SOBRE EL VISOR
          </span>

          <h2>
            Una experiencia de consulta
            pensada para la capacitación
          </h2>
        </div>

        <div className="home__about-content">
          <p>
            Esta plataforma permite visualizar material
            de capacitación institucional mediante una
            interfaz web adaptada para computadoras,
            tablets y dispositivos móviles.
          </p>

          <p>
            El acceso al material requiere un registro
            previo de visitante, permitiendo identificar
            el contexto de acceso y facilitar
            posteriormente el seguimiento estadístico
            de las consultas.
          </p>
        </div>
      </section>

      {/* =========================================
          INFORMACIÓN INSTITUCIONAL
          ========================================= */}

      <section className="home__institutional">
        <div className="home__section-header">
          <div>
            <span className="home__section-label">
              INFORMACIÓN INSTITUCIONAL
            </span>

            <h2>
              Cruz Roja Boliviana
            </h2>
          </div>
        </div>

        <div className="home__institutional-card">
          <div>
            <span>
              FILIAL
            </span>

            <strong>
              Guayaramerín
            </strong>
          </div>

          <div>
            <span>
              SERVICIO
            </span>

            <strong>
              Material de capacitación
            </strong>
          </div>

          <div>
            <span>
              MODALIDAD
            </span>

            <strong>
              Plataforma web
            </strong>
          </div>
        </div>
      </section>

      {/* =========================================
          CONTACTO
          ========================================= */}

      <section className="home__contact">
        <div className="home__contact-header">
          <span className="home__section-label">
            CONTACTO
          </span>

          <h2>
            ¿Necesitas comunicarte?
          </h2>

          <p>
            Utiliza los siguientes canales de contacto
            para comunicarte con la filial o con el
            responsable del desarrollo de la plataforma.
          </p>
        </div>

        <div className="home__contact-grid">
          {/* CONTACTO FILIAL */}

          <article className="contact-card">
            <span className="contact-card__label">
              CONTACTO INSTITUCIONAL
            </span>

            <h3>
              Filial Guayaramerín
            </h3>

            <p>
              Comunicación y atención relacionada
              con la institución.
            </p>

            <button
              type="button"
              className="contact-card__button"
              onClick={() =>
                abrirWhatsApp("73951366")
              }
            >
              <span>WhatsApp</span>
              <strong>73951366</strong>
              <span className="contact-card__arrow">
                ↗
              </span>
            </button>
          </article>

          {/* CONTACTO DESARROLLADOR */}

          <article className="contact-card">
            <span className="contact-card__label">
              DESARROLLO DE LA PLATAFORMA
            </span>

            <h3>
              Silvestre Mauricio
              <br />
              Melgar Coimbra
            </h3>

            <p>
              Consultas técnicas relacionadas con
              el desarrollo y funcionamiento de la
              plataforma.
            </p>

            <button
              type="button"
              className="contact-card__button"
              onClick={() =>
                abrirWhatsApp("73958015")
              }
            >
              <span>WhatsApp</span>
              <strong>73958015</strong>
              <span className="contact-card__arrow">
                ↗
              </span>
            </button>
          </article>
        </div>

        {/* FACEBOOK */}

        <div className="home__social">
          <span>
            También puedes encontrarnos en
          </span>

          <button
            type="button"
            className="home__facebook"
            onClick={() => {
              // Colocar aquí la URL oficial de Facebook
              // cuando esté disponible.
            }}
          >
            Facebook
            <strong>
              Cruz Roja Boliviana - Filial Guayaramerin
            </strong>
            <span>↗</span>
          </button>
        </div>
      </section>

      {/* =========================================
          FOOTER
          ========================================= */}

      <footer className="home__footer">
        <div className="home__footer-main">
          <div className="home__footer-brand">
            <span>
              CRUZ ROJA BOLIVIANA
            </span>

            <strong>
              FILIAL GUAYARAMERÍN
            </strong>
          </div>

          <div className="home__footer-development">
            <span>
              Plataforma desarrollada por
            </span>

            <strong>
              Silvestre Mauricio Melgar Coimbra
            </strong>
          </div>
        </div>

        <div className="home__footer-bottom">
  <span>
    © 2026 Cruz Roja Boliviana · Filial Guayaramerín
  </span>

  <span>
    Todos los derechos reservados.
  </span>

  <a href="/admin" className="home__admin-link" > <span>Acceso administrativo</span> <strong>→</strong> </a>
</div>
      </footer>
    </main>
  );
}

export default Home;