import { Role } from "../enums/Role";

export class User {
    private _id?: number;
    private _username: string;
    private _password: string;
    private _firstname?: string;
    private _lastname?: string;
    private _type_user?: string;
    private _state?: string;
    private _role?: Role;


    constructor(username: string, password: string, id?:number, firstname?: string, lastname?: string,type_user?: string, state?: string, role?: Role){
        this._id = id;
        this._username = username;
        this._password = password;
        this._firstname = firstname;
        this._lastname = lastname;
        this._type_user = type_user != '' ? 'USR' : 'ADM';
        this._state = state != '' ? 'Activo' : 'Inactivo';
        this._role = role;
        
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

    public get type_user(): any{
        return this._type_user;
    }

    public get state(): any{
        return this._state;
    } 

    public get role(): any{
        return this._role;
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

    public set type_user(type_user:string){
        this._type_user = type_user;
    }

    public set state(state:string){
        this._state = state;
    }

    public set role(role:Role){
        this._role = role;
    }
}
