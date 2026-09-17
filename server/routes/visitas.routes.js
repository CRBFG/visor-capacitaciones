import express from "express";

import {
  registrarVisita,
  cerrarVisita,
  marcarVisitaAbandonada,
} from "../controllers/visitas.controller.js";

const router = express.Router();

router.post("/", registrarVisita);

router.patch(
  "/:id/finalizar",
  cerrarVisita
);

router.post(
  "/:id/abandonar",
  marcarVisitaAbandonada
);

export default router;