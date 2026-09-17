import express from "express";

import {
  obtenerDashboard,
} from "../controllers/estadisticas.controller.js";

import {
  verificarAdministrador,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  verificarAdministrador,
  obtenerDashboard
);

export default router;