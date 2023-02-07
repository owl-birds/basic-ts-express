//import { TypeOf } from "zod";
import { object, z } from "zod";

export const create_product_schema = object({
    body: object({
        title: z.string({
            required_error: "Title is reuquired",
        }),
        description: z.string().optional(),
        image: z.string().optional(),
        price: z.number({
            required_error: "Price is required",
        }),
    }),
    params: object({
        user_id: z.string({
            required_error: "user id required",
        })   
    })
});

//export type Create_Product_Input = TypeOf<
//    typeof create_product_schema
//>;
export type Create_Product_Input = z.infer<
    typeof create_product_schema
>;
  //product: I_Product_Document["_id"];
  //user
  //product_id: string;
  //title: string;
  //description: string;
  //price: number;
  //image: string;
  //createdAt: Date;
  //updatedAt: Date;
