export interface LoginRequest{
    username: string,
    password: string,
    firstname?: string,
    lastname?: string,
    type_user?: string,
    state?: string,
    role?: string
}