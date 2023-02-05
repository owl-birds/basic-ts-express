import { Schema, model, Document, Model } from "mongoose";
import { I_User_Document } from "./user.model";
import { customAlphabet } from "nanoid";

// setting up nanoid
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 10);

export interface I_Product {
  //   user: Schema.Types.ObjectId; // or below
  user: I_User_Document["_id"];
  product_id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface I_Product_Document extends I_Product, Document {}
export interface I_Product_Model extends Model<I_Product_Document> {}

const Product_Schema = new Schema<I_Product_Document>(
  {
      // u can use mongoose generated id if u like 
      // // or maybe u can create mongoose midleware :: using Schema.pre()
    product_id: {
        type: String, 
        required: true, 
        unique: true, 
        default: ()=>`product_${nanoid()}`
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, default: "new product"},
    image: { type: String, default: ""},
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = model<I_Product_Document, I_Product_Model>(
  "Product",
  Product_Schema
);

export default Product;
