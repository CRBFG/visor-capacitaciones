import {
  iniciarSesionAdministrador,
} from "../services/auth.service.js";

export async function loginAdministrador(req, res) {
  try {
    const {
      username,
      password,
    } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        ok: false,
        message:
          "El usuario y la contraseña son obligatorios.",
      });
    }

    const resultado =
      await iniciarSesionAdministrador(
        username,
        password
      );

    return res.json({
      ok: true,
      message: "Inicio de sesión correcto.",
      data: resultado,
    });
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: error.message,
    });
  }
}