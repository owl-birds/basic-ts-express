import { Router, Request, Response } from "express";

// controllers
import { create_user_handler } from "../controller/user.controller";

// zod schema validate : resource ,, MIDDLEWARE
import validate from "../middleware/validate_resources";
import { create_user_schema } from "../schema/user.schema";

const router = Router({ mergeParams: true });
// mergeParams: true ::: mergin the param to the parent url
// params ex : /:id ::: request.params["id"]

router.get("/", (request: Request, response: Response) => {
  // response.sendStatus(200);
  return response.status(200).send("HELLOOOOOOOOOOOO!, TEST ROUTER");
});

// post
router.post("/api/users", validate(create_user_schema), create_user_handler);

export default router;
