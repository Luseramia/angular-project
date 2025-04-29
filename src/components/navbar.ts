import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDrawerToggleResult,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { baseUrl } from '../../config.json';
import { Router } from '@angular/router';
import { log } from 'console';
import { MatIconModule } from '@angular/material/icon';
import { LoginStateService } from '../services/user';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../router-gaurd/auth.service';
import { HttpService } from '../services/http-service';
import { flush } from '@angular/core/testing';
import { CartService } from '../services/cart-service';
import { CartItem } from '../interfaces/interface';
@Component({
  selector: 'navbar',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatBadgeModule],
  templateUrl: '../components-html/navbar.html',
})
export class Navbar implements OnInit {
  @Input() login!: boolean;
  @Output() Navtoggle = new EventEmitter<void>();
  // private authService = inject(AuthService)
  private httpService = inject(HttpService);
  private cartItems:Array<CartItem> = [];
  constructor(private router: Router, private authService: AuthService,private cartService:CartService) {
    this.cartService.cartItems.subscribe((cartItems)=>{
      this.cartItems = cartItems;
    })
  }
  public isLoginned: boolean = false;
  async ngOnInit(): Promise<void> {
    this.authService.isAuthenticated.subscribe((loginState) => {
      this.isLoginned = loginState;
    });
    this.cartService.cartItems.subscribe((cartItems)=>{
      this.cartItems = cartItems;
    });

    // this.authService.isAuthenticated.subscribe(async (loginState) => {
    //   this.isLoginned = loginState;
    //   if(this.isLoginned){
    //     const result = await this.httpService.GetData<Array<CartItem>>('/cart/getItemInCart');
    //     if("body" in result && result.body){
    //       this.cartService.setCartItem(result.body)
    //     }
    //   }})
  }
  Navshow() {
    this.Navtoggle.emit();
  }
  routeLogin() {
    this.router.navigate(['/profile']);
  }
  routeToHomePage() {
    this.router.navigate(['']);
  }
  // @Input() Navtoggle!:Promise<MatDrawerToggleResult>;
}
