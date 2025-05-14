import express, { Express } from "express";
import loaders from "./loaders";
import Logger from "./utils/logger";

export default class APIServer {
  app: Express = express();

  async init() {
    try {
      await this.load();
      Logger.info("✌️ Init Completed");
    } catch (error) {
      console.log(error);
      Logger.error("⚠️ Server not initialized");
    }
  }

  async load() {
    await loaders(this.app);
  }

  application(): Express {
    return this.app;
  }
}
