import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AuthController } from "../controllers/auth.controller";
import { celebrate, Segments } from "celebrate";
import { authLoginSchema, authRecoverySchema } from "../models/user.model";

export const authRoute = Router();
authRoute.post("/auth/login", celebrate({ [Segments.BODY]: authLoginSchema }), asyncHandler(AuthController.login));
authRoute.post("/auth/recovery", celebrate({ [Segments.BODY]: authRecoverySchema }), asyncHandler(AuthController.recovery));