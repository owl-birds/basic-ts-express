import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
// https://millo-l.github.io/Typescript-mongoose-methods-statics/
// typescript defenition fot he user schema
// https://mongoosejs.com/docs/typescript.html
export interface I_User {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface I_User_Document extends I_User, Document {
  compare_password: (password: string) => Promise<boolean>;
}
export interface I_User_Model extends Model<I_User_Document> {
  find_by_email: (email: string) => Promise<I_User_Document>;
}

const User_Schema: Schema<I_User_Document> = new Schema<I_User_Document>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// MONGOOSE MIDDLEWARE
// HookNextFunction
export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any;
}
// User_Schema.pre("save", async (next: (error?: Error) => void) => {});
User_Schema.pre("save", async function (next: HookNextFunction) {
  //
  //   let user = this as I_User;
  // let user: I_User;
  if (!this.isModified("password")) {
    // User
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("salt_work_factor"));
  const hash = await bcrypt.hashSync(this.password, salt);
  this.password = hash;
  return next();
});

// When methods are used, 'this' is the object
// called method, and when using statistics, 'this'
// is the model itself, regardless of the object
// called statistics".

// methods
User_Schema.methods.compare_password = async function (
  candidate_password: string
): Promise<boolean> {
  const user = this as I_User_Document;
  return bcrypt
    .compare(candidate_password, user.password)
    .catch((error: any) => false);
};

// statics
User_Schema.statics.find_by_email = function (email: string) {
  return this.findOne({ email });
};

const User = model<I_User_Document, I_User_Model>("User", User_Schema);

export default User;
