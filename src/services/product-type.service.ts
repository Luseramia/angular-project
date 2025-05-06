import { inject, Injectable } from "@angular/core"
import { HttpService } from "./http.service"
import { HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { ProductType } from "../interfaces/interface"

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService {  
    private httpService = inject(HttpService)

    GetProductType():Observable<HttpResponse<Array<ProductType>>>{
      return this.httpService.GetData<Array<ProductType>>('/productType')
    }

    InsertProductType(data:Object):Observable<HttpResponse<Object>>{
      return this.httpService.PostData<ProductType>('/productType/insertProductType',data)
    }
}