import { Component, inject, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { HttpService } from "../services/http-service";
import { UserService } from "../services/user";
import { Product } from "../interfaces/interface";
import { DomSanitizer } from "@angular/platform-browser";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'manage-product',
  standalone: true,
  imports: [MatGridListModule,MatCardModule,MatButtonModule,MatTableModule],
  templateUrl: '../components-html/manage-product.html',
})
export class ManageProduct implements OnInit {
  constructor (private sanitizer: DomSanitizer){}
    private httpService = inject(HttpService);
    public products!:Array<Product>|undefined;
    displayedColumns: string[] = [ 'productName', 'productPrice'];
    clickedRows = new Set<Product>();
  

    async ngOnInit():Promise<void> {
        const result = await this.httpService.PostData<Product[]>('/products/getProductByUserId',{});    
        if(result.status == 200 && "body" in result){
          this.products = result.body?.map((product)=>{
            return {
              ...product,
              productImage: this.sanitizer.bypassSecurityTrustResourceUrl(
                `data:image/png;base64,${product.productImage}`
              )
            };}
          )
          
          
        }
    }
    
}