import { useState } from "react";

const departamentos = [
  "Beni",
  "Chuquisaca",
  "Cochabamba",
  "La Paz",
  "Oruro",
  "Pando",
  "Potosí",
  "Santa Cruz",
  "Tarija",
];

const filialesDepartamentales = {
  Beni: ["Filial Departamental Beni"],
  Chuquisaca: ["Filial Departamental Chuquisaca"],
  Cochabamba: ["Filial Departamental Cochabamba"],
  "La Paz": [
    "Filial Departamental La Paz",
    "Filial Departamental El Alto",
  ],
  Oruro: ["Filial Departamental Oruro"],
  Pando: ["Filial Departamental Pando"],
  Potosí: ["Filial Departamental Potosí"],
  "Santa Cruz": ["Filial Departamental Santa Cruz"],
  Tarija: ["Filial Departamental Tarija"],
};

const motivosAcceso = [
  {
    value: "CAPACITACION",
    label: "Capacitación",
  },
  {
    value: "REPASO",
    label: "Repaso / actualización",
  },
  {
    value: "CONSULTA",
    label: "Consulta de material",
  },
  {
    value: "EVALUACION",
    label: "Evaluación",
  },
  {
    value: "OTRO",
    label: "Otro",
  },
];

function VisitorForm({
  capacitacion,
  onContinue,
  onBack,
  isRegistering,
  registrationError,
}) {
  const [nombre, setNombre] = useState("");
  const [tipoProcedencia, setTipoProcedencia] =
    useState("");
  const [departamento, setDepartamento] =
    useState("");
  const [filial, setFilial] = useState("");
  const [cargo, setCargo] = useState("");
  const [motivoAcceso, setMotivoAcceso] =
    useState("");

  const [errors, setErrors] = useState({});

  const esNacional =
    tipoProcedencia === "nacional";

  const esDepartamental =
    tipoProcedencia === "departamental";

  const esMunicipal =
    tipoProcedencia === "municipal";

  const filialesDisponibles =
    departamento
      ? filialesDepartamentales[
          departamento
        ] || []
      : [];

  const limpiarError = (campo) => {
    setErrors((actuales) => {
      if (!actuales[campo]) {
        return actuales;
      }

      const nuevos = {
        ...actuales,
      };

      delete nuevos[campo];

      return nuevos;
    });
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
    limpiarError("nombre");
  };

  const handleTipoProcedenciaChange = (
    event
  ) => {
    const value = event.target.value;

    setTipoProcedencia(value);
    setDepartamento("");
    setFilial("");
    setCargo("");

    setErrors({});
  };

  const handleDepartamentoChange = (
    event
  ) => {
    const value = event.target.value;

    const filiales =
      filialesDepartamentales[value] || [];

    setDepartamento(value);

    if (filiales.length === 1) {
      setFilial(filiales[0]);
    } else {
      setFilial("");
    }

    limpiarError("departamento");
    limpiarError("filial");
  };

  const handleFilialChange = (event) => {
    setFilial(event.target.value);
    limpiarError("filial");
  };

  const handleCargoChange = (event) => {
    setCargo(event.target.value);
    limpiarError("cargo");
  };

  const handleMotivoChange = (event) => {
    setMotivoAcceso(event.target.value);
    limpiarError("motivoAcceso");
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre =
        "Ingresa tu nombre completo.";
    }

    if (!tipoProcedencia) {
      nuevosErrores.tipoProcedencia =
        "Selecciona tu tipo de procedencia.";
    }

    if (esNacional && !cargo.trim()) {
      nuevosErrores.cargo =
        "Ingresa tu cargo o función.";
    }

    if (
      !esNacional &&
      !departamento
    ) {
      nuevosErrores.departamento =
        "Selecciona un departamento.";
    }

    if (
      esDepartamental &&
      !filial.trim()
    ) {
      nuevosErrores.filial =
        "Selecciona una filial.";
    }

    if (
      esMunicipal &&
      !filial.trim()
    ) {
      nuevosErrores.filial =
        "Ingresa tu filial municipal.";
    }

    if (!motivoAcceso) {
      nuevosErrores.motivoAcceso =
        "Selecciona el motivo del acceso.";
    }

    return nuevosErrores;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nuevosErrores =
      validarFormulario();

    if (
      Object.keys(nuevosErrores).length > 0
    ) {
      setErrors(nuevosErrores);
      return;
    }

    onContinue({
      nombre: nombre.trim(),

      tipoProcedencia,

      departamento: esNacional
        ? null
        : departamento,

      filial: esNacional
        ? "Nacional"
        : filial.trim(),

      cargo: esNacional
        ? cargo.trim()
        : null,

      motivoAcceso,
    });
  };

  return (
    <main className="visitor-form-page">
      <section className="visitor-form">
        <button
          type="button"
          className="visitor-form__back"
          onClick={onBack}
          disabled={isRegistering}
        >
          ← Volver
        </button>

        <div className="visitor-form__header">
          <span className="home__eyebrow">
            REGISTRO DE VISITANTE
          </span>

          <h1>
            Antes de comenzar
          </h1>

          <p>
            Registra tus datos para acceder
            a la capacitación.
          </p>
        </div>

        <div className="visitor-form__training">
          <span>
            Capacitación seleccionada
          </span>

          <strong>
            {capacitacion?.titulo ||
              "Capacitación"}
          </strong>
        </div>

        <form onSubmit={handleSubmit}>
          {/* NOMBRE */}

          <div
            className={`form-field ${
              errors.nombre
                ? "form-field--error"
                : ""
            }`}
          >
            <label htmlFor="nombre">
              Nombre completo
            </label>

            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={
                handleNombreChange
              }
              placeholder="Ingresa tu nombre completo"
              autoComplete="name"
              aria-invalid={Boolean(
                errors.nombre
              )}
              disabled={isRegistering}
              required
            />

            {errors.nombre && (
              <span className="form-field__error">
                {errors.nombre}
              </span>
            )}
          </div>

          {/* PROCEDENCIA */}

          <div
            className={`form-field ${
              errors.tipoProcedencia
                ? "form-field--error"
                : ""
            }`}
          >
            <label htmlFor="tipoProcedencia">
              Tipo de procedencia
            </label>

            <select
              id="tipoProcedencia"
              value={tipoProcedencia}
              onChange={
                handleTipoProcedenciaChange
              }
              aria-invalid={Boolean(
                errors.tipoProcedencia
              )}
              disabled={isRegistering}
              required
            >
              <option value="">
                Seleccionar
              </option>

              <option value="nacional">
                Nacional
              </option>

              <option value="departamental">
                Filial Departamental
              </option>

              <option value="municipal">
                Filial Municipal
              </option>
            </select>

            {errors.tipoProcedencia && (
              <span className="form-field__error">
                {errors.tipoProcedencia}
              </span>
            )}
          </div>

          {/* DEPARTAMENTO */}

          {!esNacional &&
            tipoProcedencia && (
              <div
                className={`form-field ${
                  errors.departamento
                    ? "form-field--error"
                    : ""
                }`}
              >
                <label htmlFor="departamento">
                  Departamento
                </label>

                <select
                  id="departamento"
                  value={departamento}
                  onChange={
                    handleDepartamentoChange
                  }
                  aria-invalid={Boolean(
                    errors.departamento
                  )}
                  disabled={isRegistering}
                  required
                >
                  <option value="">
                    Seleccionar departamento
                  </option>

                  {departamentos.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>

                {errors.departamento && (
                  <span className="form-field__error">
                    {errors.departamento}
                  </span>
                )}
              </div>
            )}

          {/* FILIAL DEPARTAMENTAL */}

          {esDepartamental &&
            departamento && (
              <div
                className={`form-field ${
                  errors.filial
                    ? "form-field--error"
                    : ""
                }`}
              >
                <label htmlFor="filial">
                  Filial
                </label>

                {filialesDisponibles.length ===
                1 ? (
                  <input
                    id="filial"
                    type="text"
                    value={
                      filialesDisponibles[0]
                    }
                    readOnly
                    disabled={isRegistering}
                  />
                ) : (
                  <select
                    id="filial"
                    value={filial}
                    onChange={
                      handleFilialChange
                    }
                    aria-invalid={Boolean(
                      errors.filial
                    )}
                    disabled={isRegistering}
                    required
                  >
                    <option value="">
                      Seleccionar filial
                    </option>

                    {filialesDisponibles.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                )}

                {errors.filial && (
                  <span className="form-field__error">
                    {errors.filial}
                  </span>
                )}
              </div>
            )}

          {/* FILIAL MUNICIPAL */}

          {esMunicipal &&
            departamento && (
              <div
                className={`form-field ${
                  errors.filial
                    ? "form-field--error"
                    : ""
                }`}
              >
                <label htmlFor="filial">
                  Filial Municipal
                </label>

                <input
                  id="filial"
                  type="text"
                  value={filial}
                  onChange={
                    handleFilialChange
                  }
                  placeholder="Escribe tu filial municipal"
                  aria-invalid={Boolean(
                    errors.filial
                  )}
                  disabled={isRegistering}
                  required
                />

                {errors.filial && (
                  <span className="form-field__error">
                    {errors.filial}
                  </span>
                )}
              </div>
            )}

          {/* CARGO */}

          {esNacional && (
            <div
              className={`form-field ${
                errors.cargo
                  ? "form-field--error"
                  : ""
              }`}
            >
              <label htmlFor="cargo">
                Cargo / función
              </label>

              <input
                id="cargo"
                type="text"
                value={cargo}
                onChange={
                  handleCargoChange
                }
                placeholder="Ingresa tu cargo o función"
                aria-invalid={Boolean(
                  errors.cargo
                )}
                disabled={isRegistering}
                required
              />

              {errors.cargo && (
                <span className="form-field__error">
                  {errors.cargo}
                </span>
              )}
            </div>
          )}

          {/* MOTIVO */}

          <div
            className={`form-field ${
              errors.motivoAcceso
                ? "form-field--error"
                : ""
            }`}
          >
            <label htmlFor="motivoAcceso">
              Motivo del acceso
            </label>

            <select
              id="motivoAcceso"
              value={motivoAcceso}
              onChange={
                handleMotivoChange
              }
              aria-invalid={Boolean(
                errors.motivoAcceso
              )}
              disabled={isRegistering}
              required
            >
              <option value="">
                Seleccionar motivo
              </option>

              {motivosAcceso.map(
                (motivo) => (
                  <option
                    key={motivo.value}
                    value={motivo.value}
                  >
                    {motivo.label}
                  </option>
                )
              )}
            </select>

            {errors.motivoAcceso && (
              <span className="form-field__error">
                {errors.motivoAcceso}
              </span>
            )}
          </div>

          {/* ERROR DEL SERVIDOR */}

          {registrationError && (
            <div className="visitor-form__server-error">
              {registrationError}
            </div>
          )}

          {/* CONTINUAR */}

          <button
            type="submit"
            className="visitor-form__submit"
            disabled={isRegistering}
          >
            {isRegistering
              ? "Registrando..."
              : "Continuar"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default VisitorForm;
