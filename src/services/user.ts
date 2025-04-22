import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/interface';
import { BehaviorSubject, Observable } from 'rxjs';
// @Injectable({
//     providedIn: 'root',
//   })
@Injectable({
    providedIn: 'root',
   })
export class UserService{
    userData!:UserData;
    setUserData(userData:UserData){
        this.userData = userData;
    }
    getUserData(){
        return this.userData;
    }
    
  }

@Injectable({
    providedIn: 'root'
  })
  export class LoginStateService {
    private loginSubject = new BehaviorSubject<boolean>(false);
    public login$: Observable<boolean> = this.loginSubject.asObservable();
  
    setLoginState(isLogin: boolean): void {
      this.loginSubject.next(isLogin);
    }
  
    getLoginState(): boolean {
      return this.loginSubject.value;
    }
  }

