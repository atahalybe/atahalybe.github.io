import { async } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shoppingcart';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';
import { map, take } from 'rxjs/operators';
import { ShoppingCartItems } from '../models/shoppingcart-items';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  private create(): any {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cardId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cardId).valueChanges().pipe(map((m: ShoppingCart) => {
      // let sc:ShoppingCart[];
      // sc.push(m);
      return new ShoppingCart(m.items)
    })
    );
  }

  private getItem(cartId: string, serviceId: number) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + serviceId);
  }
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }
  async AddtoCart(service: Service) {
    this.UpdateQty(service, 1);
  }
  async removeFromCart(service: Service) {
    this.UpdateQty(service, -1);
  }
  private async UpdateQty(service: Service, change) {
    debugger;
    let cartId = await this.getOrCreateCartId();
    let item = this.getItem(cartId, service.serviceId);
    let valueChanges = 0;
    item.valueChanges().
      subscribe((m: ShoppingCartItems) => {
        if (valueChanges == 0) {
          valueChanges++;
          if (m && m.quantity == 1 && change == -1) {
            item.remove();
          } else {
            try {
              item.update({ service: service, quantity: (m && m.quantity || 0) + change });
            } catch (err) {
              item.update({ service: m.service, quantity: (m && m.quantity || 0) + change });
            }
          }
        }
      })
    


  }
  async ClearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.list('/shopping-carts/' + cartId + '/items').remove();
  }
  async EmptyCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId).remove();
    localStorage.removeItem('cartId');
  }
}
