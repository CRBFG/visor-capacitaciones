import jwt from "jsonwebtoken";

export function verificarAdministrador(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        ok: false,
        message: "No autorizado.",
      });
    }

    const [tipo, token] = authorization.split(" ");

    if (tipo !== "Bearer" || !token) {
      return res.status(401).json({
        ok: false,
        message: "Token inválido.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.rol !== "ADMINISTRADOR") {
      return res.status(403).json({
        ok: false,
        message: "Acceso restringido.",
      });
    }

    req.administrador = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Sesión administrativa inválida o expirada.",
    });
  }
}