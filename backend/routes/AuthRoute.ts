import { Router } from "express";

import { authenticateClient } from "../middleware/AuthMiddleware.js";
import { clientLogin, clientLogout, getClientMe } from "../controller/AuthController.js";

const router = Router();

router.post("/login", clientLogin);
router.get("/me", authenticateClient, getClientMe);
router.post("/logout", clientLogout);

export default router;