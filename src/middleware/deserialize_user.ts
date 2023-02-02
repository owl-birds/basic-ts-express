import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { re_issue_access_token } from "../service/session.service";
import { verify_jwt } from "../utils/jwt.utils";
export const deserialize_user = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  //
  // use loadash use for safer, cause we donw know if the property is exist or not
  // console.log(get(request, "headers.authorization", ""));
  const access_token = get(request, "headers.authorization", "").replace(
    /^Bearer\s/,
    "",
  );
  if (!access_token) {
    return next();
  }
  // verfy acces token
  const { decoded, expired } = verify_jwt(access_token);
  // console.log("deserialize_user");
  console.log("deserialize_user: decoded", decoded);
  console.log("deserialize_user: expired", expired);
  console.log("deserialize_user: access_token", access_token.substring(access_token.length-10));
  // console.log(expired);
  // console.log(verify_jwt(access_token));

  // valid acces token : can be decoded
  if (decoded) {
    response.locals.user = decoded;
    return next();
  }

  // if access  token is not valid anymore:: issuing a new acces token
  const refresh_token = get(request, "headers.x-refresh-token");
  console.log("deserialize_user, refresh_token:", refresh_token ? 
              refresh_token.substring(refresh_token.length - 10) : "NO REFRESH TOKEN");

  if (expired && refresh_token) {
    const new_acces_token = await re_issue_access_token(refresh_token);
    console.log("new acces token : token", new_acces_token ?
                new_acces_token.substring(new_acces_token.length - 10) : "FALSE");
    if (new_acces_token) {
      response.setHeader("x-access-token", new_acces_token);
      const { decoded } = verify_jwt(new_acces_token);
      // console.log("new acces token: decoded", decoded);
      response.locals.user = decoded;
      return next();
    }
  }

  return next();
};
