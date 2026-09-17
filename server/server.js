import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import supabase from "./config/database.js";
import visitasRoutes from "./routes/visitas.routes.js";
import estadisticasRoutes from "./routes/estadisticas.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/visitas", visitasRoutes);
app.use(
  "/api/estadisticas",
  estadisticasRoutes
);
app.use("/api/auth", authRoutes);

app.get("/api/health", async (req, res) => {
  try {
    const { error } = await supabase
      .from("capacitaciones")
      .select("id")
      .limit(1);

    if (error) {
      return res.status(500).json({
        ok: false,
        api: true,
        database: false,
        message: error.message,
      });
    }

    res.json({
      ok: true,
      api: true,
      database: true,
      message: "API y PostgreSQL funcionando",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      api: true,
      database: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Servidor ejecutándose en http://localhost:${PORT}`
  );
});

console.log(
  "JWT_SECRET configurado:",
  Boolean(process.env.JWT_SECRET)
);