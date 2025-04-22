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
import { HttpService } from '../services/http-service';
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
    const result = await this.httpService.GetData<Product[]>('/products');
    if ('body' in result) {
      // กรณีเป็น HttpResponse
      if (result.body !== null) {
        var data = result.body.map((product) => {
          product = {
            ...product,
            productImage: this.sanitizer.bypassSecurityTrustUrl(
              `data:image/png;base64,${product.productImage}`
            ) as string,
          };
          return product
        });
        this.products = data
      } else {
        console.error('Response body is null');
      }
    } else {
      // กรณีเป็น Error
      console.error(`Error: ${result.message}, Status: ${result.status}`);
    }
  }
}



interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
}
