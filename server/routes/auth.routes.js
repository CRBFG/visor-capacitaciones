import express from "express";

import {
  loginAdministrador,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginAdministrador);

export default router;