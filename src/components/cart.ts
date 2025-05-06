import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartDataService } from '../services/data.service/cart-data.service';
import { CartItem, Product } from '../interfaces/interface';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { HttpService } from '../services/http.service';
import { HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [MatCardModule,MatGridListModule],
  templateUrl: '../components-html/cart.html',
})
export class Cart implements OnInit {
  public cartItems: Array<CartItem> = [];
  private productIds:Array<string> = [];
  public cartItemData:any = [];
  public ProductData:Array<Product> = [];
  constructor(private cartService: CartDataService,private httpService:HttpService,private sanitizer: DomSanitizer) {
    this.cartService.cartItems.subscribe(async (cartItems) => {
      this.cartItems = cartItems;
      var productIds = this.cartItems.map(cartItem=> cartItem.productId)
      this.productIds =  productIds
      if(this.productIds.length != 0){
        const result = await this.httpService.PostData<Array<Product>>("/products/getProductById",{productId:this.productIds})
        if(result instanceof HttpResponse && result.body){
            const productMap = new Map(result.body.map((p:any) =>{ 
                p.productImage = this.sanitizer.bypassSecurityTrustUrl(
                    `data:image/png;base64,${p.productImage}`
                  ) as string
                return [p.productId, p]}
            ));
            
            this.cartItemData = this.cartItems.map(cartItem => {
                const productData = productMap.get(cartItem.productId);
                return {
                  ...cartItem,      
                  ...(productData || {}) // ป้องกัน null
                };
              });
            console.log(this.cartItemData);
            // var cartItemData = result.body.map((productData)=>{
            //     var data ={};
            //     this.cartItems.map((cartItem)=>{
            //         if(cartItem.productId == productData.productId){
            //             data = ({...cartItem,...productData})
            //         }
            //         else{
            //             return;
            //         }
            //     })
            //     return data
            // })
            // this.cartItemData = cartItemData
        }
        }
    });
  }
  async ngOnInit(): Promise<void> {

    }
}
