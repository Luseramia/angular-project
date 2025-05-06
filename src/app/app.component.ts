import {
  Component,
  Injectable,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
  signal,
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
import { HttpService } from '../services/http.service';
import { Loading } from '../components/loading';
import { LoginStateService } from '../services/data.service/user-data.service';
import { ProductTypeDataService } from '../services/data.service/product-type-data.service';
import { CartDataService } from '../services/data.service/cart-data.service';
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
  constructor(private loginStateService: LoginStateService,private authService: AuthService ,private cartDataService:CartDataService,private productTypeData:ProductTypeDataService) { 
    this.loginStateService.login$.subscribe(loginState => {
    this.loginState.set(loginState);
    
  });
  this.authService.isAuthenticated.subscribe((loginState) => {
    this.isLoginned = loginState;
    this.cartDataService.setCartItem([]);
  });
}
  loginState = signal<boolean>(false); 
  isLoginned:boolean = false;
  title = 'angular-project';
  loading = true;
  private cartItems:Array<CartItem> = [];
  async ngOnInit(): Promise<void> {

      this.authService.isAuthenticated.subscribe((loginState) => {
        this.isLoginned = loginState;
        })
    }    

  async setLogin(): Promise<void> {
    try {
      const newLoginState = false;
      this.loginStateService.setLoginState(newLoginState);
      this.loginStateService.login$.subscribe(loginState => {
        this.loginState.set(loginState);
      });
    } catch (error) {
      console.log(error);
      
    }
  }

  onLoginChange(newValue: boolean) {
    this.loginStateService.setLoginState(newValue);
  }


}
