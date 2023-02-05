import { DocumentDefinition } from "mongoose";
import { I_Product_Document } from "../model/product.model";

const create_product = async (
    input: DocumentDefinition<
        Omit<I_Product_Document, "createdAt" | "updatedAt">
    //I_Product_Document>
    >
)=>{
    
}

const get_product = async ()=>{}
const update_product = async ()=>{}
const delete_product = async ()=>{}

export {
    create_product, 
    get_product, 
    update_product, 
    delete_product
}
