import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CartItem } from "../interfaces/interface";
import { Certificate } from "crypto";
import { HttpService } from "./http-service";
import { log } from "console";

@Injectable({
    providedIn: 'root'
  })
  export class CartService {
    private _cartItems = new BehaviorSubject<Array<CartItem>>([]);
    public  cartItems = this._cartItems.asObservable();
    public _countItems = new BehaviorSubject<Number>(0);
    public countItem = this._countItems.asObservable();
    private httpService = inject(HttpService)
    async setCartItem(cartItem: Array<CartItem>): Promise<void> {
      const cci = localStorage.getItem('countCartItem');
      const countFromStorage = cci ? parseInt(cci, 10) : 0;
      const countCurrentAddItem = cartItem.reduce((sum,item)=>sum+item.quantity,0)
      const currentItems = this._cartItems.getValue();
      const updatedItems = [...currentItems, ...cartItem];
      const totalCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      console.log("cookie",countFromStorage + countCurrentAddItem);
      console.log("total",totalCount);
      this._cartItems.next(updatedItems); 
      this._countItems.next(totalCount);
      localStorage.setItem('countCartItem', JSON.stringify(totalCount))
      if(countFromStorage + countCurrentAddItem  != totalCount){
        const result = await this.httpService.GetData<Array<CartItem>>('/cart/getItemInCart');
        if ('body' in result && result.body) {
          this.setCartItem(result.body);
        }
      }
      // else{

      // }
    }
  
    getCartItem(){
        return this._cartItems.value;
    }
  }


