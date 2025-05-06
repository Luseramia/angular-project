import { inject, Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Product } from "../interfaces/interface";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ProductService {  
    private httpService = inject(HttpService)

    GetProducts():Observable<HttpResponse<Array<Product>>>{
      return this.httpService.GetData<Array<Product>>('/products')
    }

    GetProductById(data:Object):Observable<HttpResponse<Array<Product>>>{
      return this.httpService.PostData<Array<Product>>('/products/getProductById',data)
    }

    GetProductByUserId():Observable<HttpResponse<Array<Product>>>{
      return this.httpService.PostData<Array<Product>>('/products/getProductByUserId',{})
    }

    InsertProduct(data:Object){
      return this.httpService.PostData<Product>('/products',data)
    }

    UpdateProduct(data:Object){
      return this.httpService.PostData<Product>('/products/updateProduct',data)
    }

    DeleteProduct(data:Object){
      return this.httpService.PostData<Product>('/products/deleteProduct',data)
    }
}