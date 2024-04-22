
export class Delivery{
    _id?: number = 0;
    _name: string = "";
    _description: string = "";
    _price: number = 0;
    _img: string = "";

    get id():any{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get description(){
        return this._description;
    }

    get price():number{
        return this._price;
    }

    get img(): string{
        return this._img;
    }

    set name(name: string){
        this._name = name;
    }

    set description(description: string){
        this._description = description;
    }

    set price(price: number){
        this._price = price;
    }

    set img(img: string){
        this._img = img;
    }

    constructor(
        name: string,
        description: string,
        price: number,
        img: string,
        id?:number
    ){
        this.name = name;
        this.description = description;
        this.price = price;
        this.img = img;
    }
}