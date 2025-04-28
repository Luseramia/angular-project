import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpService } from "./http-service";
import { ProductType } from "../interfaces/interface";

@Injectable({
  providedIn: 'root',
})

export class ProductTypeService {
constructor(private http: HttpClient) {
    this.httpService.GetData<ProductType[]>('/productType').then((result)=>{
        if('body' in result && result.status ==200 && result.body != null){
            this.productType = result.body
        }
    })
}
    private productType!:Array<ProductType>;
    private httpService = inject(HttpService);

    getProductType(){
        return this.productType
    }
}

