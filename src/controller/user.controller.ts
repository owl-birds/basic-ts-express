import { Request, Response } from "express";
// Models
import User from "../model/user.model";
// utils
import log from "../utils/logger";
// services
import { create_user } from "../service/user.service";
import { Create_User_Input } from "../schema/user.schema";

// CONTROLLERS
export const create_user_handler = async (
  request: Request<{}, {}, Create_User_Input["body"]>,
  response: Response
) => {
  try {
    const user = await create_user(request.body); // call create user service
    return response.send(user);
  } catch (error: any) {
    log.error(error);
    return response.status(409).send(error.message);
    // 409 COFLICT // VIOLATED SOMETHING
  }
};
