import { useState } from "react";
import { loginAdministrador } from "../services/authService";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      setLoading(true);

      await loginAdministrador(
        username,
        password
      );

      onLogin();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "No fue posible iniciar sesión."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-header">
          <span>CRUZ ROJA BOLIVIANA</span>

          <h1>Administrador</h1>

          <p>
            Acceso al panel de visualización y
            estadísticas.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-login-field">
            <label htmlFor="username">
              Usuario
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Ingresando..."
              : "Iniciar sesión"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AdminLogin;