import { StateFactura } from "../enums/StateShipping";

export interface FacturacionRequest{
    id?: number,
    email: string,
    name: string,
    address: string,
    cp: number,
    method: number,
    subtotal: number,
    total: number,

    id_user: number,
    state: StateFactura | string,
    date: string
}