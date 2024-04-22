
import { StateFactura } from "../enums/StateShipping";

export class Factura {

    private _id?: number;
    private _email?: string; // ? email
    private _name?: string; // ? Nombre a la persona a facturar
    private _address?: string; // ? Direccion
    private _cp?: number; // ? Codigo postal
    private _method?: string; // ? Metodo de envio
    private _subtotal?: number; // ? Subtotal
    private _total?: number; // ? Total = subtotal + costo Envio

    private _id_user?: number; // ? Id del usuario a facturar
    private _state?: string | StateFactura; // ? Estado de la factura
    private _date?: string; // ? Fecha

    get id(): any {
        return this._id;
    }

    get id_user(): any {
        return this._id_user;
    }

    get date(): any {
        return this._date;
    }

    get state(): any {
        return this._state;
    }

    get email(): any {
        return this._email;
    }

    get name(): any {
        return this._name;
    }

    get address(): any {
        return this._address;
    }

    get cp(): any {
        return this._cp;
    }

    get method(): any {
        return this._method;
    }

    get subtotal(): any {
        return this._subtotal;
    }

    get total(): any {
        return this._total;
    }

    set id(id: number) {
        this._id = id;
    }

    set id_user(id_user: number) {
        this._id_user = id_user;
    }

    set date(date: string) {
        this._date = date;
    }

    set state(state: string | StateFactura) {
        this._state = state;
    }

    set email(email: string) {
        this._email = email;
    }

    set name(name: string) {
        this._name = name;
    }

    set address(address: string) {
        this._address = address;
    }

    set cp(cp: number) {
        this._cp = cp;
    }

    set method(method: string) {
        this.method = method;
    }

    set subtotal(subtotal: number) {
        this._subtotal = subtotal;
    }

    set total(total: number) {
        this._total = total;
    }

    constructor(
        id: number,
        id_user: number,
        date: string,
        state: string | StateFactura,
        email: string,
        name: string,
        address: string,
        cp: number,
        method: string,
        subtotal: number,
        total: number
    ) {
        this.id = id
        this.id_user = id_user
        this.date = date
        this.state = state
        this.email = email
        this.name = name
        this.address = address
        this.cp = cp
        this.method = method
        this.subtotal = subtotal
        this.total = total
    }
}