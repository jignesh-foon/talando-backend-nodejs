import express, { Router } from "express";
import cors from "cors";
import httpStatus from "http-status";
import ui from "swagger-ui-express";
import config from "../config";
import apiRoutes from "../api";
import Logger from "../utils/logger";
import apidocs from "../docs/api";

export default async (app: express.Application) => {
  try {
    const router = Router();
    //CORS Policy
    app.use(cors({}));

    // Public Access
    app.use(express.static("public"));

    // Transform string to JSON
    app.use(express.json({ type: "*/json", strict: false, limit: "20mb" }));

    // Config Prefix
    app.use(`${config.api.prefix}`, router);

    // Routes
    router.get("/status", (req, res) => {
      return res.status(httpStatus.OK).json({ message: "API Working" });
    });

    router.use("/", apiRoutes);
    router.use("/images", express.static("public/images"));
    router.use("/documentation", ui.serve, ui.setup(apidocs));
  } catch (error) {
    Logger.error(error);
  }
};
