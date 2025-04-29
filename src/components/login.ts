import { Component, signal, inject, EventEmitter ,Output } from '@angular/core';
import exp from 'constants';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpService } from '../services/http-service';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Loading } from './loading';
import { LoginStateService, UserService } from '../services/user';
import { CartItem, UserData } from '../interfaces/interface';
import { AuthService } from '../router-gaurd/auth.service';
import { response } from 'express';
import { CartService } from '../services/cart-service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Loading
  ],

  templateUrl: '../components-html/login.html',
})
export class Login {
  @Output() loginSuccess = new EventEmitter<void>();
  private loginStateService = inject(LoginStateService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  hide = signal(true);
  loading = false;
  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  returnUrl = '';
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  constructor(private router: Router,private cdr: ChangeDetectorRef,private route: ActivatedRoute,private cartService:CartService) {
    // รับ returnUrl จาก query params (ถ้ามี)
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '';
    });
  }
  private httpService = inject(HttpService);
  async Login(): Promise<void> {
    // const dataToSend: DataToSend = {
    //   username: this.usernameControl.value!,
    //   password: this.passwordControl.value!,
    // };
    // console.log(this.returnUrl);
    
    // // this.router.navigate(['/test']);
    // const result = await this.httpService.PostData<UserData>('/login', dataToSend);
    // if (result.status == 200 && 'body' in result && result.body != null) {
    //   this.loginSuccess.emit();
    //   this.userService.setUserData(result.body);
    //   this.loginStateService.setLoginState(true)
    // }
    // else{
    //   console.log(result)
    // }
    this.authService.login(this.usernameControl.value!, this.passwordControl.value!).subscribe({
      next: async (response) => {
        localStorage.setItem('userRole', JSON.stringify(response.body.role));
        this.userService.setUserData(response.body);
        const result = await this.httpService.GetData<Array<CartItem>>('/cart/getItemInCart');
        if("body" in result && result.body){
          this.cartService.setCartItem(result.body)
        }
        this.loginSuccess.emit();
        this.router.navigateByUrl(this.returnUrl);
      },
      error: err => {
        this.loading = false;
        
      }
    });
  }
  
}

interface DataToSend {
  username: string;
  password: string;
}

