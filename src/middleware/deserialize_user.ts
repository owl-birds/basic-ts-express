import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verify_jwt } from "../utils/jwt.utils";
export const deserialize_user = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //
  // use loadash use for safer, cause we donw know if the property is exist or not
  // console.log(get(request, "headers.authorization", ""));
  const access_token = get(request, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  if (!access_token) {
    return next();
  }
  // verfy acces token
  const { decoded, expired } = verify_jwt(access_token);
  // console.log("deserialize_user");
  // console.log("deserialize_user",decoded);
  // console.log(access_token);
  // console.log(expired);
  // console.log(verify_jwt(access_token));
  if (decoded) {
    response.locals.user = decoded;
    return next();
  }

  return next();
};
