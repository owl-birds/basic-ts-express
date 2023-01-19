import { Schema, model, Document, Model } from "mongoose";
import { I_User_Document } from "./user.model";

export interface I_Session {
  //   user: Schema.Types.ObjectId; // or below
  user: I_User_Document["_id"];
  valid: boolean;
  user_agent: string; // browser type
  createdAt: Date;
  updatedAt: Date;
}
export interface I_Session_Document extends I_Session, Document {}
export interface I_Session_Model extends Model<I_Session_Document> {}

const Session_Schema = new Schema<I_Session_Document>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    user_agent: { type: String },
  },
  {
    timestamps: true,
  }
);

const Session = model<I_Session_Document, I_Session_Model>(
  "Session",
  Session_Schema
);

export default Session;
