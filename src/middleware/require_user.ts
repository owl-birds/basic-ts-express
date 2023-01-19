import { Request, Response, NextFunction } from "express";
export const require_user = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = response.locals.user;
  //   console.log(response.locals);
  if (!user) {
    return response
      .status(403)
      .send("WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA, require_user"); // forbidden
  }
  return next();
};
