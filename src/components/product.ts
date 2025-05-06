import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HttpService } from '../services/http.service';
import { HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { CartDataService } from '../services/data.service/cart-data.service';
import { ProductService } from '../services/product.service';
import { Product as product } from '../interfaces/interface';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'product',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: '../components-html/product.html',
})
export class Product implements OnInit {
  constructor (private sanitizer: DomSanitizer){}
  private route = inject(ActivatedRoute);
  private paramSub!: Subscription; // ใช้เก็บ subscription
  private productService = inject(ProductService)
  private cartDataService = inject(CartDataService)
  private httpService = inject(HttpService);
  private cartService = inject(CartService)
  public product_id!: string | null;
  public productDescription!: string | null;
  public product!:product|null;
  public image!:string | null;
 async ngOnInit(): Promise<void> {
    this.paramSub = this.route.paramMap.subscribe((params) => {
      this.product_id = params.get('id');
      console.log('ID from URL:', this.product_id);
    });
    this.productService.GetProductById({ productId: [this.product_id] }).subscribe(res=>{
      if(res && res.body){
        this.product = res.body[0]
        if(this.product){
          this.product = {...this.product,productImage:this.sanitizer.bypassSecurityTrustUrl(
            `data:image/png;base64,${this.product?.productImage}`
          ) as string}
        }
      } 
    })
    // const result = await this.httpService.PostData<Array<product>>('/products/getProductById', { productId: [this.product_id] });
    // if (result instanceof HttpResponse && result.body) {
    //     this.product = result.body[0]
    //     if(this.product){
    //       this.product = {...this.product,productImage:this.sanitizer.bypassSecurityTrustUrl(
    //         `data:image/png;base64,${this.product?.productImage}`
    //       ) as string}
    //     }
        
    // } else {
    //   // console.error('API Error:', result.message);
    // }
  }

  async AddItemToCart(productId:string){
    this.cartDataService.setCartItem([{productId:productId,quantity:1}])
    this.cartService.InsertCartItemByUserId({ productId: productId,quantity:1 }).subscribe(res=>{
      if(res && res.status == 200){
        console.log('success');
      }
    })
    // const result = await this.httpService.PostData('/cart/insertCartItemByUserId', { productId: productId,quantity:1 });
  }

}


