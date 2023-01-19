import { TypeOf } from "zod";
import { object, string } from "zod";

export const session_login_user_schema = object({
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "password is required",
    }).min(6, "password is too short, should be min 6 characters"),
  }),
});
export type Session_Login_User_Schema = TypeOf<
  typeof session_login_user_schema
>;
