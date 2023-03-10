// console.log("HELLO WORLD");
import express, { Express } from "express";
import config from "config";
import routes from "./routes";

// middleware
import { deserialize_user } from "./middleware/deserialize_user";

// utils
import {
  // connect,
  connect_async,
} from "./utils/connect";
import log from "./utils/logger";

const port = config.get<number>("port");
//
const app: Express = express();

// middleware

// body parser NEEDED
app.use(express.json());
app.use(deserialize_user); // will be called for every enpoind of every requesrt

app.listen(port, async () => {
  //   console.log("app listening to port", port);
  // console.log(config.get<string>("db_uri"));

  ///
  const host = config.get<string>("host");
  log.info(`App is listening at http://${host}:${port}`);
  //   await connect();
  await connect_async();
  routes(app);
});
