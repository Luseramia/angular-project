import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http-service';
import { blob } from 'node:stream/consumers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../components-html/product.html',
})
export class Product implements OnInit {
  constructor(private router: Router) {}

  private route = inject(ActivatedRoute);
  private httpService = inject(HttpService);
  public objectUrl!: string;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // ดึงค่า id จาก URL
    console.log('ID from URL:', id);
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const product = navigation.extras.state['product'];
      console.log('Product from state:', product);
    } else {
      console.log('No state found, fetching product by ID...');
      // this.fetchProductById(id!); // เรียก API กรณีไม่มี state
    }
  }
}
