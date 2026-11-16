import express from 'express';
import authRoute from './AuthRoute.js'

const router = express.Router();

router.use("/auth", authRoute)

export default router;