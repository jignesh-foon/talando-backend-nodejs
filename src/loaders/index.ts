import express from "express";
import Logger from "../utils/logger";
import loadDatabase from "./database";
import loadDependencies from "./dependencies";
import loadExpress from "./express";

export default async (app: express.Application) => {
  await loadDatabase();
  Logger.info("✌️ Database connected");
  await loadDependencies();
  Logger.info("✌️ Dependencies loaded");
  await loadExpress(app);
  Logger.info("✌️ Express loaded");
};
