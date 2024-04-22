import { Product } from "../models/product";

export interface PaymentRequest{
    email: string,
    name: string,
    address: string,
    cp: number,
    subtotal: number,
    total: number
}

