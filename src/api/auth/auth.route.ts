import { Router } from "express";
import authController from "./auth.controller";
import { handleAuthentication, handleValidate } from "../../utils/handler";
import { login, register } from "./auth.validate";

const route = Router();

route.post("/register", [handleValidate(register)], authController.register);
route.post("/login", [handleValidate(login)], authController.login);
route.get("/verify", [handleAuthentication], authController.verify);
route.get("/logout", authController.logout);

export default route;
