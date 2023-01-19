// import { DocumentDefinition } from "mongoose";
// model
import { FilterQuery } from "mongoose";
import Session, { I_Session_Document } from "../model/session.model";

export const create_session = async (user_id: string, user_agent: string) => {
  try {
    const session = await Session.create({ user: user_id, user_agent });
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const get_session = async (query: FilterQuery<I_Session_Document>) => {
  //
  return await Session.find(query).lean(); // .lean() return plain object same as toJSON()
};
