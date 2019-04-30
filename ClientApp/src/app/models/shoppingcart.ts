import { ShoppingCartItems } from './shoppingcart-items';
export class ShoppingCart {    
    constructor(public items: ShoppingCartItems[]){
        
    }
    get serviceIds(){
        return Object.keys(this.items);
    }
    get Itemcount() {
        let count = 0;
        for (let serviceId in this.items) {
            count += this.items[serviceId].quantity;
        }
        return count;
    }
    get NetTotal(){
        let netTotal=0;
        for (let serviceId in this.items) {
            netTotal += this.items[serviceId].service.price*this.items[serviceId].quantity;
        }
        return netTotal;
    }    
}