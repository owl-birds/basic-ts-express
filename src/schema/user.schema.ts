import { TypeOf } from "zod";
import { object, string } from "zod";

export const create_user_schema = object({
  body: object({
    name: string({
      required_error: "Name is reuquired",
    }),
    password: string({
      required_error: "password is required",
    }).min(6, "password is too short, should be min 6 characters"),
    password_confirmation: string({
      required_error: "password is required",
    }).min(6, "password is too short, should be min 6 characters"),
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.password_confirmation, {
    message: "Password do not match",
    path: ["password_confirmation"],
  }),
});

export type Create_User_Input = Omit<
  TypeOf<typeof create_user_schema>,
  "body.password_confirmation"
>;
