export class Shipment {
    private _id?: number;
    private _address: string;
    private _city: string;
    private _state: string;
    private _postal_code: number;
    private _country: string;

    constructor(
        address: string,
        city: string,
        state: string,
        postal_code: number,
        country: string,
        id?: number
    ){
        this._id = id;
        this._address = address;
        this._city = city;
        this._state = state;
        this._postal_code = postal_code;
        this._country = country;
    }

    get id(): any {
        return this._id;
    }

    get address(): string{
        return this._address;
    }

    get city(): string{
        return this._city;
    }

    get state(): string{
        return this._state;
    }

    get postal_code(): number{
        return this._postal_code;
    }

    get country(): string{
        return this._country;
    }

    set address(address: string){
        this._address = address;
    }

    set city(city: string){
        this._city = city;
    }

    set state(state: string){
        this._state = state;
    }

    set postal_code(postal_code: number){
        this._postal_code = postal_code;
    }

    set country(country: string){
        this._country = country;
    }
    
}