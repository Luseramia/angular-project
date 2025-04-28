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
import { HttpService } from '../services/http-service';
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
  typeProductName = new FormControl('', [Validators.required]);
    private httpService = inject(HttpService);
    async Submit() {
    if(this.typeProductName.value){
      const result = await this.httpService.PostData('/productType/insertProductType',{typeName:this.typeProductName.value});
      if(result.status==200){
        console.log("success");
        
      }
    }
  
  }
}
