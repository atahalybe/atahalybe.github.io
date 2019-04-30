import { Service } from './service.model';


export class ShoppingCartItems {

    constructor(public service: Service, public quantity: number) {

    }
    get TotalPrice() {
        return this.service.price * this.quantity;
    }
}