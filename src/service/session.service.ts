// import { DocumentDefinition } from "mongoose";
// model
import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { I_Session_Document } from "../model/session.model";
import { verify_jwt, sign_jwt } from "../utils/jwt.utils";
import { find_user } from "./user.service";
import config from "config";
import {get} from "lodash";


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
export const update_session = async (
    query: FilterQuery<I_Session_Document>, 
    update: UpdateQuery<I_Session_Document>)=>{
    return await Session.updateOne(query, update);
};
export const re_issue_access_token = async (refresh_token: string)=>{
    const {decoded} = verify_jwt(refresh_token);
    if (!decoded || !get(decoded, "_id")){
        return false;
    }
    // console.log("session: service", decoded);
    const session = await Session.findById(get(decoded, "session"));
    // console.log("session: service", session);
    if (!session || !session.valid){
        return false;
    }
    const user = await find_user({_id: session.user});
    // OMIT THE PASSWORD
    if (!user) return false;
    
    // Create new acces toke// create an access token
    const access_token = sign_jwt(
        { ...user, session: session._id },
        { expiresIn: config.get<string>("access_token_ttl") } // 15 minutes time to live (ttl)
    );
    return access_token;
}
