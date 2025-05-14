import Container from "typedi";
import fs from "fs";
import Logger from "../utils/logger";
import path from "path";

export default async () => {
  try {
    Container.set("Logger", Logger);

    for (const model of fs.readdirSync(path.resolve(__dirname, "../models"))) {
      let name = model.split(".")[0];
      let capitalize = name[0].toUpperCase() + name.slice(1);
      let schema = require(`../models/${name}`).default;

      Container.set(capitalize, schema);
    }
  } catch (error) {
    Logger.error(error);
  }
};
