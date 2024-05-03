import { Role } from "../enums/Role";
import { StateUser } from "../enums/StateUser";

export class User {
    private _id?: number;
    private _username: string;
    private _password: string;
    private _firstname?: string;
    private _lastname?: string;
    private _state?: StateUser;
    private _role?: Role;
    private _img?: string;

    constructor(username: string, password: string, id?:number, firstname?: string, lastname?: string, state?: StateUser, role?: Role, img?: string){
        this._id = id;
        this._username = username;
        this._password = password;
        this._firstname = firstname;
        this._lastname = lastname;
        this._state = state;
        this._role = role;
        this._img = img;
    }   

    public get id(): any{
        return this._id;
    }

    public get username(): string{
        return this._username;
    }

    public get password(): string{
        return this._password;
    }

    public get firstname(): any{
        return this._firstname;
    }

    public get lastname(): any{
        return this._lastname;
    }   

    public get state(): any{
        return this._state;
    } 

    public get role(): any{
        return this._role;
    } 

    public get img(): any{
        return this._img;
    }

    public set id(id: number){
        this._id = id;
    }

    public set username(username:string){
        this._username = username;
    }

    public set password(password: string){
        this._password = password;
    }

    public set firstname(firstname:string){
        this._firstname = firstname;
    }

    public set lastname(lastname:string){
        this._lastname = lastname;
    }

    public set state(state:StateUser){
        this._state = state;
    }

    public set role(role:Role){
        this._role = role;
    }

    public set img(img:string){
        this._img = img;
    }
}
