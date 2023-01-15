import { DocumentDefinition } from "mongoose";
import User, { I_User_Document } from "../model/user.model";
export const create_user = async (
  input: DocumentDefinition<
    Omit<I_User_Document, "createdAt" | "updatedAt" | "compare_password">
  > // omitting createdAt, updatedAt, compare_password method
) => {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};
