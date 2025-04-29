import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CartItem } from "../interfaces/interface";

@Injectable({
    providedIn: 'root'
  })
  export class CartService {
    private _cartItems = new BehaviorSubject<Array<CartItem>>([]);
    public  cartItems = this._cartItems.asObservable();
    public _countItems = new BehaviorSubject<Number>(0);
    public countItem = this._countItems.asObservable();
    setCartItem(cartItem: Array<CartItem>): void {
      const currentItems = this._cartItems.getValue();
      const updatedItems = [...currentItems, ...cartItem];
      this._cartItems.next(updatedItems); 
      const totalCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem('countCartItem', JSON.stringify(totalCount))
      this._countItems.next(totalCount);
    }
  
    getCartItem(){
        return this._cartItems.value;
    }
  }


