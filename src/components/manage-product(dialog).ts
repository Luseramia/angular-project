import { Component, inject, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ProductTypeDataService } from "../services/data.service/product-type-data.service";
import { ProductType } from "../interfaces/interface";
import swal  from 'sweetalert2';
@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: '../components-html/manage-product(dialog).html',
    standalone: true,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatGridListModule,
      MatSelectModule,
    ],
  })
  
export class DialogOverviewExampleDialog {
constructor (private productTypeDataService:ProductTypeDataService){
  this.productTypes = this.productTypeDataService.getProductType()
  
}
readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
readonly data = inject(MAT_DIALOG_DATA);
public product = this.data.product
// readonly product = model(this.data)
readonly productName = model(this.product.productName);
readonly productPrice = model(this.product.productPrice);
readonly productDescription = model(this.product.productDescription);
public productImage = this.product.productImage;
readonly tag = model(this.product.tag);
readonly typeId = model(this.product.typeId);
public file!:File;
readonly productId = this.data.productId
public test!:ProductType;
readonly productTypes!:Array<ProductType>;
// readonly productName = this.data.productName
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
      this.productImage = `data:image/png;base64,${this.file.content}`;
    };
    reader.readAsDataURL(file);
  } else {
    console.log('No file selected');
  }
}

onNoClick(): void {
  if (this.data.dialogCloseEvent) {
    this.data.dialogCloseEvent.emit();
  }
  this.dialogRef.close();

}
onSaveClick():void{
  if(this.file!=undefined || null){
    const updatedProduct = {
      productId:this.data.product.productId,
      productName: this.productName(), // Use () to get the value
      productPrice: this.productPrice(),
      productDescription:this.productDescription(),
      tag:this.tag(),
      typeId:this.typeId(),
      file:this.file,
      productImage:this.file.content,
      imageId:this.data.product.imageId
    };
    this.dialogRef.close(updatedProduct);
  }
  else{
      const updatedProduct = {
        productId:this.data.product.productId,
        productName: this.productName(), 
        productPrice: this.productPrice(),
        productDescription:this.productDescription(),
        tag:this.tag(),
        typeId:this.typeId(),
        productImage:this.productImage,
        imageId:this.data.product.imageId
      }
      this.dialogRef.close(updatedProduct);
  }
}

onDeleteProduct(){
  swal.fire({
    title: "ต้องการลบสินค้าใช่หรือไม่!",
    showCancelButton: true,
    confirmButtonText: "ใช่",
    denyButtonText: `ไม่ใช่`
  }).then((result) => {
    if (result.isConfirmed) {
      if (this.data.deleteProduct) {
        this.data.deleteProduct.emit();
        this.dialogRef.close()
      }
    }
  });
 
}

}


interface File {
    name: string;
    type: any;
    size: number;
    content: string;
  }