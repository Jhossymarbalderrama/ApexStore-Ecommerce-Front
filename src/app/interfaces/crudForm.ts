import { Product } from "../models/product";
import { User } from "../models/user";
import { ProductRequest } from "./productRequest";

export interface CrudForm{
    action: number,
    item?: any //Product | ProductRequest | User | UserRequest
}