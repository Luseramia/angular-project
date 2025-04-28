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
export class AppComponent {
  constructor(private cookieService: CookieService,private router: Router,private loginStateService: LoginStateService
  ) { this.loginStateService.login$.subscribe(loginState => {
    this.loginState = loginState;
  });}
  private productTypeService = inject(ProductTypeService);
  loginState: boolean = false; 
  title = 'angular-project';
  loading = true;

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
