import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from '../services/http.service';
import { FormControl,   FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ProductTypeDataService } from '../services/data.service/product-type-data.service';
import {Product, ProductType} from '../interfaces/interface'
import { ProductService } from '../services/product.service';
@Component({
  selector: 'add-product',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: '../components-html/add-product.html',
})
export class AddProduct implements OnInit {
  productName = new FormControl('', [Validators.required]);
  productDescription = new FormControl('', [Validators.required]);
  productPrice = new FormControl('', [Validators.required]);
  productTypeId = new FormControl('', [Validators.required]);
  tag = new FormControl('', [Validators.required]);
  file!: File;
  productTypes!:Array<ProductType>|null
  public objectUrl!: string;
  private productTypeDataService = inject(ProductTypeDataService);
  private productService = inject(ProductService)

  async ngOnInit(): Promise<void> {
    this.productTypes = this.productTypeDataService.getProductType()
    // const result = await this.httpService.GetData<Array<ProductType>>('/productType');
    // if('body' in result){
    //   this.productTypes = result.body
    // }
    
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      if (file) {
        // ตรวจสอบ MIME type
        if (!file.type.startsWith('image/')) {
          alert('กรุณาอัปโหลดเฉพาะไฟล์รูปภาพ');
          return;
        }
      }
      reader.onload = () => {
        this.file = {
          name: file.name,
          type: file.type,
          size: file.size,
          content: reader.result!.toString().split(',')[1], // แปลงเป็น Base64
        };
        this.objectUrl = `data:image/png;base64,${this.file.content}`;
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  }

  async sendData() {
    if (
      this.productName.value  &&
      this.productDescription.value  &&
      this.productPrice.value  &&
      this.file != null
    ) {
      
      const dataTosent = {
        "productName": this.productName.value,
        "productDescription": this.productDescription.value,
        "productPrice":this.productPrice.value,
        "file":this.file,
        "typeId":this.productTypeId,
        "tag":this.tag.value
      };
      this.productService.InsertProduct(dataTosent)
    }
  }
}

interface File {
  name: string;
  type: any;
  size: number;
  content: string;
}
