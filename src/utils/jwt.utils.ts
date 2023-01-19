// reading
// https://dev.to/darken/jwt-how-does-it-work-and-is-it-secure-37n
// https://jwt.io/introduction/
// https://siddharthac6.medium.com/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
import config from "config";
import jwt from "jsonwebtoken";

// secure ur private_key
const private_key = config.get<string>("private_key");
const public_key = config.get<string>("public_key");

export const sign_jwt = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(object, private_key, {
    ...(options && options),
    algorithm: "RS256",
  });
};
export const verify_jwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, public_key);
    // console.log("JWT UTILS,", decoded);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      message_1: "error verify_jwt",
      message_2: error.message,
      decoded: null,
    };
  }
};
