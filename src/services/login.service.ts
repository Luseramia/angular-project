import { inject, Injectable } from "@angular/core"
import { HttpService } from "./http.service"
import { HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { ProductType } from "../interfaces/interface"

@Injectable({
  providedIn: 'root',
})
export class LoginService {  
    private httpService = inject(HttpService)

    Login(data:Object):Observable<HttpResponse<Object>>{
      return this.httpService.PostData("/login",data)
    }

    Logout():Observable<HttpResponse<Object>>{
        return this.httpService.PostData("/logout",{})
    }

    Verify():Observable<HttpResponse<Object>>{
        return this.httpService.GetData("/verify")
      }
}