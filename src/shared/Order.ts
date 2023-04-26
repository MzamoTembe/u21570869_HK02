import { User } from "./User";
import { CartItem } from "./cart";

export class Order  {
    id!: number;
    cartitem!: CartItem[];
    instructions!: string;
    date!: string;
    deliveryfee!: 50;
    user!: User;
    total!: number;
    
    constructor() {
        
    }
}