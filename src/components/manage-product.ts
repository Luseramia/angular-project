import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, inject, model, NgZone, OnChanges, OnInit, signal, SimpleChanges } from "@angular/core";
import { HttpService } from "../services/http.service";
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
import { ProductTypeDataService } from "../services/data.service/product-type-data.service";
import {MatSelectModule} from '@angular/material/select';
import { ProductService } from "../services/product.service";
import { DialogOverviewExampleDialog } from "./manage-product(dialog)";
@Component({
  selector: 'manage-product',
  standalone: true,
  imports: [MatGridListModule,MatCardModule,MatButtonModule,MatTableModule,MatFormFieldModule,
    MatInputModule],
  templateUrl: '../components-html/manage-product.html',

})
export class ManageProduct implements OnInit {
  constructor (private sanitizer: DomSanitizer,private cdr: ChangeDetectorRef){}
    private httpService = inject(HttpService);
    private productService = inject(ProductService)
    public products!:Array<Product>|undefined;
    displayedColumns: string[] = [ 'productName', 'productPrice'];
    clickedRows = new Set<Product>();
    public updating:boolean = false;
    readonly dialog = inject(MatDialog);
    async ngOnInit():Promise<void> {
        this.productService.GetProductByUserId().subscribe(res=>{
          if(res && res.body){
            this.products = res.body?.map((product)=>{
              return {
                ...product,
                productImage: this.sanitizer.bypassSecurityTrustResourceUrl(
                  `data:image/png;base64,${product.productImage}`
                )
              };})
          }
        })
        // const result = await this.httpService.PostData<Product[]>('/products/getProductByUserId',{});    
        // if(result.status == 200 && "body" in result){
        //   this.products = result.body?.map((product)=>{
        //     return {
        //       ...product,
        //       productImage: this.sanitizer.bypassSecurityTrustResourceUrl(
        //         `data:image/png;base64,${product.productImage}`
        //       )
        //     };}
        //   )
        // }
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
        height:'1000px',
        width:'1000px',
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result !== undefined) {
          if (typeof result === 'function') {
          } else if (result && typeof result.value !== 'undefined') {
          } else {
          const { file, ...productProps } = result;
          if(file!=undefined){
            this.productService.UpdateProduct(result).subscribe(res=>{
              if(res.status == 200){
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
              }
              else{
                swal.fire({
                  title: "เกิดข้อผิดพลาด!",
                  text: "ไม่สามารถอัพเดตข้อมูลได้",
                  icon: "error"
                });
              }
            })
            // const backresult = await this.httpService.PostData('/products/updateProduct',result);
            //   if(backresult.status == 200){
            //     const productImage = this.sanitizer.bypassSecurityTrustResourceUrl(
            //       `data:image/png;base64,${result.productImage}`
            //     )
            //     const updatedProduct: Product = {
            //         productId: result.productId,
            //         productName: result.productName,
            //         productPrice: result.productPrice,
            //         productDescription: result.productDescription,
            //         tag: result.tag,
            //         typeId: result.typeId,
            //         imageId: result.imageId,
            //         productImage:productImage
            //     };
            //       if(this.products){
            //         this.products[index] = updatedProduct;
            //         // this.cdr.markForCheck();
            //       }
            //       swal.fire({
            //         title: "อัปเดตสำเร็จ!",
            //         text: "ข้อมูลสินค้าได้รับการอัปเดตเรียบร้อยแล้ว",
            //         icon: "success"
            //       });
            //       // this.updating = false
            //   }
            //   else{
            //     swal.fire({
            //       title: "เกิดข้อผิดพลาด!",
            //       text: "ไม่สามารถอัพเดตข้อมูลได้",
            //       icon: "error"
            //     });
            //   }
          }
          else{
            this.productService.UpdateProduct(productProps).subscribe(res=>{
              if(res.status == 200){
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
            })
            // const backresult = await this.httpService.PostData('/products/updateProduct',productProps);
            // if(backresult.status == 200){
            //   const updatedProduct: Product = {
            //     productId: result.productId,
            //     productName: result.productName,
            //     productPrice: result.productPrice,
            //     productDescription: result.productDescription,
            //     tag: result.tag,
            //     typeId: result.typeId,
            //     imageId: result.imageId,
            //     productImage:result.productImage
            // };
            //     if(this.products){
            //       this.products[index] = updatedProduct;
            //       // this.cdr.markForCheck();
            //     }
            //     swal.fire({
            //       title: "อัปเดตสำเร็จ!",
            //       text: "ข้อมูลสินค้าได้รับการอัปเดตเรียบร้อยแล้ว",
            //       icon: "success"
            //     });
            //     // this.updating = false
            // }
            // else{
            //   swal.fire({
            //     title: "เกิดข้อผิดพลาด!",
            //     text: "ไม่สามารถอัพเดตข้อมูลได้",
            //     icon: "error"
            //   });
            // }
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
      this.productService.DeleteProduct(product).subscribe(res=>{
        if(res.status==200){
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
      })
      // const result = await this.httpService.PostData('/products/deleteProduct',product);
      // if(result.status == 200){
      //   swal.fire({
      //     title: "ลบสินค้าสำเร็จ!",
      //     text: "ข้อมูลสินค้าได้รับการอัปเดตเรียบร้อยแล้ว",
      //     icon: "success"
      //   });
      //   this.products?.splice(index,1)
      // }
      // else{
      //   swal.fire({
      //     title: "เกิดข้อผิดพลาด!",
      //     text: "ไม่สามารถลบสินค้าได้",
      //     icon: "error"
      //   });
      // }
      // this.Showtable()
    }

}
  export interface DialogData {
      animal: string;
      name: string;
    }

