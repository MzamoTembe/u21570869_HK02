import { Restaurant } from "./restaurant";

export class CartItem  {  
    id!: number;
    restaurant!: Restaurant;
    itemscount!: number;
    total!: number;
    
    constructor() {
        
    }
}