import "reflect-metadata";
import "mongoose-paginate-v2";
import config from "./config";
import Logger from "./utils/logger";
import APIServer from "./app";

const server = new APIServer();
server.init();

const app = server.application();

app.listen(config.port, () => {
  Logger.info(
    `✌️ ${
      config.name[0].toUpperCase() + config.name.slice(1)
    } application started`
  );
  Logger.info(
    `✌️ ${config.env[0].toUpperCase() + config.env.slice(1)} server loaded`
  );
});
