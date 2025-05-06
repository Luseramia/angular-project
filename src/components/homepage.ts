import { Component, inject, Input, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpService } from '../services/http.service';
import { ProductTypeDataService } from '../services/data.service/product-type-data.service';
import { CardContent } from './card-content';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/interface';
@Component({
  selector: 'homepage',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: '../components-html/homepage.html',
})
export class Homepage implements OnInit {
  constructor(private router: Router, private sanitizer: DomSanitizer) {}
  private httpService = inject(HttpService);
  private productService = inject(ProductService)
  public products: Array<Product> = [];
  async getProduct(id: string, product: Product) {
    this.router.navigate(['/product', id], {
      state: { product: product },
    });
  }
  ngOnInit(): void {
    this.getProducts();
    
    }

  async getProducts() {
    // const result = await this.httpService.GetData<Product[]>('/products');
    // this.httpService.PostDataa('/products',{}).subscribe(res=>console.log(res))
    this.productService.GetProducts().subscribe(res=>{
        if(res.body){
          var data = res.body.map((product) => {
          product = {
            ...product,
            productImage: this.sanitizer.bypassSecurityTrustUrl(
              `data:image/png;base64,${product.productImage}`
            ) as string,
          };
          return product
        });
        this.products = data
      }
    })
    // if ('body' in result) {
    //   // กรณีเป็น HttpResponse
    //   if (result.body !== null) {
    //     var data = result.body.map((product) => {
    //       product = {
    //         ...product,
    //         // productImage: this.sanitizer.bypassSecurityTrustUrl(
    //         //   `data:image/png;base64,${product.productImage}`
    //         // ) as string,
    //       };
    //       return product
    //     });
    //     this.products = data
    //   } else {
    //     console.error('Response body is null');
    //   }
    // } else {
    //   // กรณีเป็น Error
    //   console.error(`Error: ${result.message}, Status: ${result.status}`);
    // }
  }
}


