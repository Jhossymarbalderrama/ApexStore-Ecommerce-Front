export class Product {
    private _id: number;
    private _name: string;
    private _description: string;
    private _category: string;
    private _price: number;
    private _discount: number;
    private _stock: number;
    private _state: string;
    private _discharge_date: string | Date;
    private _img: string[];

    constructor(
        id: number,
        name: string,
        description: string,
        category: string,
        price: number,
        discount: number,
        stock: number,
        state: string,
        discharge_date: string | Date,
        img: any[]
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._category = category;
        this._price = price;
        this._discount = discount;
        this._stock = stock;
        this._state = state;
        this._discharge_date = discharge_date;
        this._img = img;
    }

    get id():number{
        return this._id;
    }

    get name():string{
        return this._name;
    }

    get description():string{
        return this._description;
    }

    get category():string{
        return this._category;
    }

    get price():number{
        return this._price;
    }

    get discount():number{
        return this._discount;
    }

    get stock():number{
        return this._stock;
    }

    get state():string{
        return this._state;
    }

    get discharge_date():string | Date{
        return this._discharge_date;
    }

    get img():string[]{
        return this._img;
    }

}
