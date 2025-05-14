import dotenv from "dotenv";

const env = dotenv.config();
if (env.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  name: process.env.NAME || "Talando",
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  database: {
    url: process.env.DB_URL,
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    prefix: "/api",
  },
  redis: {
    host: process.env.REDIS_QUEUE_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_QUEUE_PORT || 6379),
    cluster: process.env.REDIS_QUEUE_CLUSTER || false,
  },
  password: {
    max_attempt: Number(process.env.PASSWORD_MAX_ATTEMPT || 3),
    salt: Number(process.env.PASSWORD_SALT || 10),
    block_time_limit: Number(process.env.PASSWORD_BLOCK_TIME_LIMIT || 10),
  },
  token: {
    max_attempt: Number(process.env.TOKEN_MAX_ATTEMPT || 3),
    expiry: Number(process.env.TOKEN_EXPIRY || 10),
    secret: process.env.TOKEN_SECRET,
  },
};
