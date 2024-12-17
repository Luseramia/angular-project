import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from '../services/http-service';
import { FormControl,   FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  ],
  templateUrl: '../components-html/add-product.html',
})
export class AddProduct {
  productName = new FormControl('', [Validators.required]);
  productDescription = new FormControl('', [Validators.required]);
  productPrice = new FormControl('', [Validators.required]);
  file!: File;
  public objectUrl!: string;
  private httpService = inject(HttpService);
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
    console.log(this.file!=null)
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
        "file":this.file
      };
      const result = await this.httpService.PostData('/insert-product',dataTosent);
    }
  }
}

interface File {
  name: string;
  type: any;
  size: number;
  content: string;
}
