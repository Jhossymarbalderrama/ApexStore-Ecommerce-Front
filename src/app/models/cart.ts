import { Product } from "./product";

export class Cart {
    private _id?: number;
    // private _date: Date | string; //Fecha de Compra
    // private _state: string; //Pendiente - Procesando - Finalizado
    private _products: Product[] | []; //Productos que compro
    private _subtotal: number; //Sub Total 
    private _total: number; //Total

    constructor(        
        date: Date | string,
        state: string,
        products: Product[] | [],
        subtotal: number,
        total: number,
        id?: number
    ) {
        this._id = id;
        // this._date = date;
        // this._state = state;
        this._products = products;
        this._subtotal = subtotal;
        this._total = total;
    }

    get id(): any {
        return this._id;
    }

    // get date(): Date | string {
    //     return this._date;
    // }

    // get state(): string {
    //     return this._state;
    // }

    get products(): Product[] | [] {
        return this._products;
    }

    get subtotal(): number {
        return this._subtotal;
    }

    get total(): number {
        return this._total;
    }

    set id(id: number){
        this.id = id;
    }

    // set date(date: Date | string){
    //     this._date = date;
    // }


    // set state(state: string){
    //     this._state = state;
    // }

    set products(products: Product[] | []){
        this._products = products;
    }

    set subtotal(subtotal: number){
        this._subtotal = subtotal;
    }

    set total(total: number){
        this._total = total;
    }
}
