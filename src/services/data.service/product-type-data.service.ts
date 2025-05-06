import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { ProductType } from "../../interfaces/interface";
import { error } from "console";
import { ProductTypeService } from "../product-type.service"

@Injectable({
  providedIn: 'root',
})

export class ProductTypeDataService {
constructor() {
    this.productTypeService.GetProductType().subscribe(res=>{
        if(res && res.body){
            this.productType = res.body
        }
    })

}
    private productTypeService = inject(ProductTypeService)
    private productType!:Array<ProductType>;
    getProductType(){
        return this.productType
    }
}

