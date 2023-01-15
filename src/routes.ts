import { Express, Request, Response } from "express";

// ROUTER
import test_routes from "./routes/test_router";

const routes = (app: Express) => {
  app.get("/", (request: Request, response: Response) => {
    response.send("HOME");
  });
  app.use("/test", test_routes);
};

export default routes;
