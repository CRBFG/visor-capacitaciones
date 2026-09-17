import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function iniciarSesionAdministrador(
  username,
  password
) {
  if (username !== process.env.ADMIN_USERNAME) {
    throw new Error("Credenciales incorrectas.");
  }

  const passwordValida = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH
  );

  if (!passwordValida) {
    throw new Error("Credenciales incorrectas.");
  }

  const token = jwt.sign(
    {
      username,
      rol: "ADMINISTRADOR",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "4h",
    }
  );

  return {
    token,
    administrador: {
      username,
      rol: "ADMINISTRADOR",
    },
  };
}