import { SafeResourceUrl } from '@angular/platform-browser';
import exp from 'constants';
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
  tag:string;
  typeId:string;
  imageId:string;
}



export interface  ProductType{
  typeId:string;
  typeName:string;
}


export interface CartItem{
  productId:string
  quantity:number
}