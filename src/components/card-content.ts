import { Component, Input, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'cardcontent',
  standalone: true,
  imports: [],
  templateUrl: '../components-html/card-content.html',
  styleUrl:'../component-css/card-content.css'
})
export class CardContent implements OnInit{
  constructor(private sanitizer: DomSanitizer) {

  }

  @Input() productName!:string | null;
  public productname!:string | null;
  @Input() productImage!:string | null;
  public productimage!:SafeUrl|null;

  ngOnInit(): void {
    this.productimage = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.productImage}`) as string
    console.log(this.productimage);
  }

}