import { Router, Request, Response } from "express";
const router = Router({ mergeParams: true });
// mergeParams: true ::: mergin the param to the parent url
// params ex : /:id ::: request.params["id"]

router.get("/", (request: Request, response: Response) => {
  // response.sendStatus(200);
  return response.status(200).send("HELLOOOOOOOOOOOO!, TEST ROUTER");
});

export default router;
