import { DocumentDefinition, FilterQuery } from "mongoose";
import Product, { I_Product_Document } from "../model/product.model";

const create_product = async (
    input: DocumentDefinition<
        Omit<I_Product_Document, "createdAt" | "updatedAt">
    //I_Product_Document>
    >
)=>{
    try {
        const product = await Product.create(input);
        return product.toJSON();
    } catch (_error) {
        throw new Error("error in creating product");
    }
}

const find_product = async (
    query: FilterQuery<I_Product_Document>,
    is_one: boolean = false
)=>{
    try {
        if (is_one){
            const product = await Product.findOne(query);
            if (!product) return false;
            return product.toJSON();
        }
        const product = await Product.find(query).lean();
        if (!product) return false;
        return product;
    } catch (_error) {
        throw new Error("error in finding product based on query");
    }
}

const get_product_based_id = async (product_id: string)=>{
    try {
       // const product = await Product.findById(product_id);
       const product = await Product.find({product_id: product_id}).lean();
       if (!product) return false;
       return product;
    } catch (_error) {
       throw new Error("error in finding product based on id");
    }
}
const get_products_based_user_id = async (user_id: string)=>{
    try {
        const products = await Product.find({user: user_id}).lean();
        if (!products) return false;
        return products;
    } catch (_error) {
        throw new Error("error in finding product based on user id");
    }
}
const update_product = async ()=>{}
const delete_product = async ()=>{}

export {
    create_product, 
    find_product,
    get_product_based_id, 
    get_products_based_user_id, 
    update_product, 
    delete_product
}
