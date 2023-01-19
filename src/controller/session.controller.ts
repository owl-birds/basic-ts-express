import { Request, Response } from "express";
import { omit } from "lodash";
import config from "config";
// Models
import Session from "../model/session.model";
// utils
import log from "../utils/logger";
// services
import { create_session, get_session } from "../service/session.service";
import { validate_password } from "../service/user.service";
import { sign_jwt } from "../utils/jwt.utils";

//
// CONTROLLERS
export const create_user_session_handler = async (
  request: Request,
  response: Response
) => {
  const { email, password } = request.body;
  // validate user passsword
  const user = await validate_password(email, password);
  if (!user) return response.status(401).send("Invalid email or password");
  // return response.send(user);
  // create a session
  const session = await create_session(
    user._id,
    request.get("user-agent") || ""
  );
  // create an access token
  const access_token = sign_jwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>("access_token_ttl") } // 15 minutes time to live (ttl)
  );
  // create a refresh token
  const refresh_token = sign_jwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>("refresh_token_ttl") }
  );
  // return access and refresh token
  return response.send({ access_token, refresh_token });
};
export const get_user_session_handler = async (
  request: Request,
  response: Response
) => {
  //
  const user_id = response.locals.user._id;
  const session = await get_session({ user: user_id, valid: true });
  return response.send(session);
};
