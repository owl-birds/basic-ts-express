import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import User, { I_User_Document } from "../model/user.model";
export const create_user = async (
  input: DocumentDefinition<
    Omit<I_User_Document, "createdAt" | "updatedAt" | "compare_password">
  > // omitting createdAt, updatedAt, compare_password method
) => {
  try {
    // return await User.create(input);
    const user = await User.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
};
export const validate_password = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return false; // user doesnt exist

    const is_valid = await user.compare_password(password);
    if (!is_valid) return false;

    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
};
