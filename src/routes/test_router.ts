import { Router, Request, Response } from "express";

// controllers
import { create_user_handler } from "../controller/user.controller";
import {
  create_user_session_handler,
  get_user_session_handler,
} from "../controller/session.controller";

// zod schema validate : resource ,, MIDDLEWARE
import validate from "../middleware/validate_resources";
import { create_user_schema } from "../schema/user.schema";
import { session_login_user_schema } from "../schema/session.schema";
import { require_user } from "../middleware/require_user";

const router = Router({ mergeParams: true });
// mergeParams: true ::: mergin the param to the parent url
// params ex : /:id ::: request.params["id"]

// GET
router.get("/", (request: Request, response: Response) => {
  // response.sendStatus(200);
  return response.status(200).send("HELLOOOOOOOOOOOO!, TEST ROUTER");
});
router.get("/api/user/session", require_user, get_user_session_handler);

//POST
router.post("/api/user", validate(create_user_schema), create_user_handler);
router.post(
  "/api/user/session",
  validate(session_login_user_schema),
  create_user_session_handler
);
export default router;
