import {
  Component,
  Injectable,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Login } from '../components/login';
import { log } from 'console';
import { MainLayout } from '../components/MainLayout';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { HttpService } from '../services/http-service';
import { Loading } from '../components/loading';
import { LoginStateService } from '../services/user';
import { ProductTypeService } from '../services/product-type';
import { CartService } from '../services/cart-service';
import { Init } from 'v8';
import { AuthService } from '../router-gaurd/auth.service';
import { CartItem } from '../interfaces/interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Login,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MainLayout,
    Loading,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
@Injectable({ providedIn: 'root' })
export class AppComponent implements OnInit {
  constructor(private cookieService: CookieService,private router: Router,private loginStateService: LoginStateService,private authService: AuthService ,private cartService:CartService) { 
    this.loginStateService.login$.subscribe(loginState => {
    this.loginState = loginState;
  });
  this.authService.isAuthenticated.subscribe((loginState) => {
    this.isLoginned = loginState;
  });
}
  private productTypeService = inject(ProductTypeService);
  private httpService = inject(HttpService)
  loginState: boolean = false; 
  isLoginned:boolean = false;
  title = 'angular-project';
  loading = true;
  private cartItems:Array<CartItem> = [];
  async ngOnInit(): Promise<void> {
    this.cartService.cartItems.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
    this.cartService.countItem.subscribe((countItem) => {
      console.log('จำนวนสินค้าในตะกร้า:', countItem);
    });
    const cci = localStorage.getItem('countCartItem');
    
    
    // this.loginStateService.login$.subscribe(loginState => {
      //   this.loginState = loginState;
      // });
      // console.log(this.isLoginned);
      this.authService.isAuthenticated.subscribe(async (loginState) => {
        this.isLoginned = loginState;
        if(this.isLoginned){
        console.log(cci);
        // const result = await this.httpService.GetData<Array<CartItem>>('/cart/getItemInCart');
        // if("body" in result && result.body){
        //   this.cartService.setCartItem(result.body)
        // }
        // console.log(result);
      }})
    }    

  async setLogin(): Promise<void> {
    try {
      const newLoginState = false;
      this.loginStateService.setLoginState(newLoginState);
      this.loginStateService.login$.subscribe(loginState => {
        this.loginState = loginState;
      });
    } catch (error) {
      console.log(error);
      
    }
  }

  onLoginChange(newValue: boolean) {
    this.loginStateService.setLoginState(newValue);
  }


}
