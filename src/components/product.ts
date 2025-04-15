import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HttpService } from '../services/http-service';
import { HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { log } from 'node:console';
@Component({
  selector: 'product',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: '../components-html/product.html',
})
export class Product implements OnInit {
  constructor (private sanitizer: DomSanitizer){}
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private paramSub!: Subscription; // ใช้เก็บ subscription
  private httpService = inject(HttpService);
  public product_id!: string | null;
  public productDescription!: string | null;
  public product!:product|null;
  public image!:string | null;
 async ngOnInit(): Promise<void> {
    this.paramSub = this.route.paramMap.subscribe((params) => {
      this.product_id = params.get('id');
      console.log('ID from URL:', this.product_id);
    });
    const result = await this.httpService.PostData<product>('/findProduct', { productId: this.product_id });
    if (result instanceof HttpResponse) {
      if (result.body?.imgId) {
        this.product = result.body
        const image = await this.httpService.PostData<{ imageData?: string }>('/findImage', { imgId: result.body.imgId });
        if (image instanceof HttpResponse) {
          if (image.body?.imageData) {
            this.image =this.sanitizer.bypassSecurityTrustUrl(
            `data:image/png;base64,${image.body.imageData}`
          ) as string
          }
        }
      }
    } else {
      console.error('API Error:', result.message);
    }
  }
}



interface product {
  productId: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  imgId:string;
}
