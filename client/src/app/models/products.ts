//With ? we make some properties optional
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    type?: string;
    brand: string;
    quantityInStock?: number;
}