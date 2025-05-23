import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { error } from 'console';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5192'; // ใช้ port เดียวกับที่คุณใช้ในโค้ดอื่น
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated: Observable<boolean> = this._isAuthenticated.asObservable();
  constructor(private http: HttpClient, private router: Router,private loginService:LoginService) {
    // ตรวจสอบสถานะการ authenticate เมื่อเริ่มต้น service
    // this.checkAuthStatus().subscribe();
  }

  // เข้าสู่ระบบ (server จะตั้งค่า cookie ให้)
  login(username: string, password: string): Observable<any> {
    return this.loginService.Login({username, password}).pipe(
      tap(()=>{
        this._isAuthenticated.next(true)
      }),
      catchError(error=>{
        this._isAuthenticated.next(false)
        return throwError(() => error);
      })
    )
    // return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, {
    //   observe: 'response',
    //   responseType: 'json', 
    //   headers: { 'Content-Type': 'application/json' },
    //   withCredentials: true 
    // }).pipe(
    //   tap(() => {
    //     this._isAuthenticated.next(true)
    //   }),
    //   catchError(error => {
    //     this._isAuthenticated.next(false)
    //     return throwError(() => error);
    //   })
    // );
  }

  // ออกจากระบบ (server จะลบ cookie)
  logout(): Observable<any> {
    return this.loginService.Logout().pipe(
      tap(()=>{
        this._isAuthenticated.next(true)
      }),
      catchError(error=>{
        this._isAuthenticated.next(false)
        return throwError(() => error);
      })
    ) 
    // return this.http.post<any>(`${this.apiUrl}/logout`, {}, {
    //   withCredentials: true
    // }).pipe(
    //   tap(() => {
    //     this._isAuthenticated.next(false)
    //     localStorage.clear();
    //   }),
    //   catchError(error => {
    //     return throwError(() => error);
    //   })
    // );
  }

  // ตรวจสอบว่ายังได้รับการ authenticate อยู่หรือไม่
  checkAuthStatus(): Observable<boolean> {
    var Role:string|null = "";
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('userRole');
      Role = data
    }
    if(!Role){
      this.logout().subscribe();
      return of(false);
    }

    return this.loginService.Verify().pipe(
      map(()=>{
        this._isAuthenticated.next(true)
        return true;
      }),
      catchError(() => {
        this._isAuthenticated.next(false);
        return of(false);
      })
    )
    // return this.http.get<any>(`${this.apiUrl}/verify`, {
    //   withCredentials: true
    // }).pipe(
    //   map(() => {
    //     this._isAuthenticated.next(true)
    //     return true;
    //   }),
    //   catchError(() => {
    //     this._isAuthenticated.next(false)
    //     return of(false);
    //   })
    // );
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
    return this._isAuthenticated.value;
  }
}