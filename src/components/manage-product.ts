import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, inject, model, NgZone, OnChanges, OnInit, signal, SimpleChanges } from "@angular/core";
import { HttpService } from "../services/http-service";
import { UserService } from "../services/user";
import { Product, ProductType } from "../interfaces/interface";
import { DomSanitizer } from "@angular/platform-browser";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import swal  from 'sweetalert2';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { type } from "node:os";
import { ProductTypeService } from "../services/product-type";
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'manage-product',
  standalone: true,
  imports: [MatGridListModule,MatCardModule,MatButtonModule,MatTableModule],
  templateUrl: '../components-html/manage-product.html',

})
export class ManageProduct implements OnInit {
  constructor (private sanitizer: DomSanitizer,private cdr: ChangeDetectorRef){}
    private httpService = inject(HttpService);
    public products!:Array<Product>|undefined;
    displayedColumns: string[] = [ 'productName', 'productPrice'];
    clickedRows = new Set<Product>();
    public updating:boolean = false;
    readonly dialog = inject(MatDialog);
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

    selectedRow(row:Product,index:number){
      this.updating = true;
      const dialogCloseEvent = new EventEmitter<void>();
      const deleteProduct = new EventEmitter<void>();
      dialogCloseEvent.subscribe(() => {
        this.Showtable();
      });
      deleteProduct.subscribe(() => {
        this.deleteProduct(row,index);
      });
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        data: {product:row,"dialogCloseEvent":dialogCloseEvent,"deleteProduct":deleteProduct},
        height:'50rem',
        width:'1000px',
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result !== undefined) {
          if (typeof result === 'function') {
          } else if (result && typeof result.value !== 'undefined') {
          } else {
          const { file, ...productProps } = result;
          if(file!=undefined){
            const backresult = await this.httpService.PostData('/products/updateProduct',result);
              if(backresult.status == 200){
                const productImage = this.sanitizer.bypassSecurityTrustResourceUrl(
                  `data:image/png;base64,${result.productImage}`
                )
                const updatedProduct: Product = {
                    productId: result.productId,
                    productName: result.productName,
                    productPrice: result.productPrice,
                    productDescription: result.productDescription,
                    tag: result.tag,
                    typeId: result.typeId,
                    imageId: result.imageId,
                    productImage:productImage
                };
                  if(this.products){
                    this.products[index] = updatedProduct;
                    // this.cdr.markForCheck();
                  }
                  swal.fire({
                    title: "อัปเดตสำเร็จ!",
                    text: "ข้อมูลสินค้าได้รับการอัปเดตเรียบร้อยแล้ว",
                    icon: "success"
                  });
                  // this.updating = false
              }
              else{
                swal.fire({
                  title: "เกิดข้อผิดพลาด!",
                  text: "ไม่สามารถอัพเดตข้อมูลได้",
                  icon: "error"
                });
              }
          }
          else{
            const backresult = await this.httpService.PostData('/products/updateProduct',productProps);
            if(backresult.status == 200){
              const updatedProduct: Product = {
                productId: result.productId,
                productName: result.productName,
                productPrice: result.productPrice,
                productDescription: result.productDescription,
                tag: result.tag,
                typeId: result.typeId,
                imageId: result.imageId,
                productImage:result.productImage
            };
                if(this.products){
                  this.products[index] = updatedProduct;
                  // this.cdr.markForCheck();
                }
                swal.fire({
                  title: "อัปเดตสำเร็จ!",
                  text: "ข้อมูลสินค้าได้รับการอัปเดตเรียบร้อยแล้ว",
                  icon: "success"
                });
                // this.updating = false
            }
            else{
              swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: "ไม่สามารถอัพเดตข้อมูลได้",
                icon: "error"
              });
            }
          }
          }
        }
        this.Showtable()
      });
    }
  
    Showtable(){
      this.updating = false;
      this.cdr.markForCheck();
    }

    async deleteProduct(product:Product,index:number){
      const result = await this.httpService.PostData('/products/deleteProduct',product);
      if(result.status == 200){
        swal.fire({
          title: "ลบสินค้าสำเร็จ!",
          text: "ข้อมูลสินค้าได้รับการอัปเดตเรียบร้อยแล้ว",
          icon: "success"
        });
        this.products?.splice(index,1)
      }
      else{
        swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถลบสินค้าได้",
          icon: "error"
        });
      }
      this.Showtable()
    }

}
  export interface DialogData {
      animal: string;
      name: string;
    }
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
        MatSelectModule
      ],
    })
    
export class DialogOverviewExampleDialog {
  constructor (){
    this.productTypes = this.productTypeService.getProductType()
    
  }
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject(MAT_DIALOG_DATA);
  private productTypeService = inject(ProductTypeService);
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
          productName: this.productName(), // Use () to get the value
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
      /* Read more about isConfirmed, isDenied below */
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