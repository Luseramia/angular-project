import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5192'; // ใช้ port เดียวกับที่คุณใช้ในโค้ดอื่น
  private _isAuthenticated = false;
  
  constructor(private http: HttpClient, private router: Router) {
    // ตรวจสอบสถานะการ authenticate เมื่อเริ่มต้น service
    // this.checkAuthStatus().subscribe();
  }

  // เข้าสู่ระบบ (server จะตั้งค่า cookie ให้)
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, {
      withCredentials: true // สำคัญมากเพื่อให้ browser รับ cookie จาก response
    }).pipe(
      tap(() => {
        this._isAuthenticated = true;
      }),
      catchError(error => {
        this._isAuthenticated = false;
        return throwError(() => error);
      })
    );
  }

  // ออกจากระบบ (server จะลบ cookie)
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this._isAuthenticated = false;
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  // ตรวจสอบว่ายังได้รับการ authenticate อยู่หรือไม่
  checkAuthStatus(): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/verify`, {
      withCredentials: true
    }).pipe(
      map(() => {
        this._isAuthenticated = true;
        return true;
      }),
      catchError(() => {
        this._isAuthenticated = false;
        return of(false);
      })
    );
  }

  // ตรวจสอบสถานะการ authenticate
  isLoggedIn(): Observable<boolean> {
    // ถ้าเคยตรวจสอบแล้วว่าเป็น true ก็คืนค่า true เลย
    // if (this._isAuthenticated) {
    //   return of(true);
    // }
    // ถ้ายังไม่แน่ใจ ให้ตรวจสอบอีกครั้ง
    return this.checkAuthStatus();
  }

  // getter สำหรับสถานะปัจจุบัน (non-blocking)
  get authenticated(): boolean {
    return this._isAuthenticated;
  }
}