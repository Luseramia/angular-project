import { SafeResourceUrl } from '@angular/platform-browser';
export interface UserData{
    userId:string;
    name:string;
    username:string;
    role:string;
  } 

export interface Product{
  productId: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImage: string | SafeResourceUrl;
  imgId:string;
}