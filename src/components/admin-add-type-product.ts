import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../services/http.service';
import { ProductTypeService } from '../services/product-type.service';
@Component({
  selector: 'add-type-product',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: '../components-html/add-type-product.html',
})
export class AddTypeProduct {
  private productTypeService = inject(ProductTypeService)
  typeProductName = new FormControl('', [Validators.required]);
    async Submit() {
    if(this.typeProductName.value){
      this.productTypeService.InsertProductType({typeName:this.typeProductName.value}).subscribe(res=>{
        if(res.status==200){
          console.log("success");
        }
      })
    }
  }
}
