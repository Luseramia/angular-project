import { Observable } from "rxjs"
import { CartItem, ProductType } from "../interfaces/interface"
import { HttpResponse } from "@angular/common/http"
import { Injectable, inject } from "@angular/core"
import { HttpService } from "./http.service"

@Injectable({
  providedIn: 'root',
})
export class CartService {  
    private httpService = inject(HttpService)

    GetItemInCart():Observable<HttpResponse<Array<CartItem>>>{
      return this.httpService.GetData<Array<CartItem>>('/cart/getItemInCart')
    }

    InsertCartItemByUserId(data:Object):Observable<HttpResponse<Object>>{
      return this.httpService.PostData<ProductType>('/cart/insertCartItemByUserId',data)
    }
}