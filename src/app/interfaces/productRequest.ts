export interface ProductRequest{
    id?: number,
    name: string,
    description: string,
    category: string,
    price: number,
    discount: number,
    stock: number,
    state: string,
    discharge_date: string,
    img: any[]
}