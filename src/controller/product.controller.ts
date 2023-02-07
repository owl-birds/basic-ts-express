import { Request, Response } from "express";
import { create, omit } from "lodash";
import { find_product, create_product } from "../service/product.service.ts";
// utils
import log from "../utils/logger";
// services
//

export const test_product = (request: Request, response: Response)=>{
    const {user_id} = request.params;
    return response.send(`HELLOOOO :::: ${user_id}`);
}

export const create_product_controller = async (request: Request, response: Response)=>{
    try {
        // body
        const {body} = request;
        // params 
        const {user_id} = request.params;
        const input = {
            ...body,
            user: user_id
        }
        const new_product = await create_product(input);
        return response.status(201).send(new_product);
    } catch (error: any) {
        return response.status(409).send(error.message);
    }
}

export const get_products = async  (request: Request, response: Response)=>{
    try {
        const {user_id} = request.params;
        const products = await find_product({user: user_id});
        return response.status(201).send(products);
    } catch (error: any) {
       return response.status(409).send(error.message);
    }
}

