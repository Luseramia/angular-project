import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
  } from '@angular/common/http';
import { AppComponent } from '../app/app.component';
import {LoginStateService, UserDataService} from "../services/data.service/user-data.service"
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private loginStateService: LoginStateService,private userDataService: UserDataService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.loginStateService.setLoginState(true);
          
        }
        else {
          // ถ้า login แล้วเช็ค role
          const allowedRoles = route.data['roles'] as string[]; 
          const Role = localStorage.getItem('userRole');
          if (!Role) {
            this.router.navigate(['/']); 
            return;
          }
          if (allowedRoles && !allowedRoles.includes(Role)) {
            console.log("ไม่มีสิทธิ์");
            // ถ้า role ไม่ตรง
            this.router.navigate(['/']); // หรือ redirect ไปหน้า error
          }
        }
      })
    );
  }
}

