// console.log("HELLO WORLD");
import express, { Express } from "express";
import config from "config";

// utils
import {
  // connect,
  connect_async,
} from "./utils/connect";
import log from "./utils/logger";

const port = config.get<number>("port");
//
const app: Express = express();

app.listen(port, async () => {
  //   console.log("app listening to port", port);
  const host = config.get<string>("host");
  log.info(`App is listening at http://${host}:${port}`);
  //   await connect();
  //   await connect_async();
});
