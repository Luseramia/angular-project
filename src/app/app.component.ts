import {
  Component,
  Injectable,
  OnInit,
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
  constructor(private cookieService: CookieService,private router: Router) {}
  login: boolean = false; 
  title = 'angular-project';
  test = false;
  abc = 'abc';
  initialCount = 18;
  loading = true;
  id: string = '';
  firstName: string = 'asdfasdf';
  firstLoad : Boolean = true;
  private httpService = inject(HttpService);

  async setLogin(): Promise<void> {
    this.login = !this.login;
    const token = this.cookieService.get('jwtToken');
    if (!token) {
      console.log('ไม่มีtoken'); // ไม่มี Token แสดงว่าไม่ได้ล็อกอิน
    }

    try {
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken);
      const isExpired = decodedToken.exp * 1000 < Date.now(); // ตรวจสอบวันหมดอายุ
      console.log(isExpired);
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

  ngOnInit(): void {
  //   this.CheckLogin();
  }
  onLoginChange(newValue: boolean) {
    console.log('app work')
    this.login = newValue;
  }

  async CheckLogin(): Promise<void> {
    // console.log('test');
    // console.log('1');
    this.loading = true;
    try {
      const result = await this.httpService.PostData('/checkLogin', {});
      // result.status === 200?console.log('loginned'):this.login
      this.login = !(result.status === 200);
    } catch (error) {
      console.error('Error during login check:', error);
      // this.login = false;
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 10);
// โหลดเสร็จ ไม่ว่าจะสำเร็จหรือไม่
    }
  }

  // getData(): void{
  //   this.http.get('http://localhost:5192/test1',{ withCredentials: true }).subscribe(res=>{

  //     console.log('respones = ',res);
  //   })
  // }
}
