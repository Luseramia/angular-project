import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {  
  constructor(private http: HttpClient) {}
   PostData<T>(endpoint: string, data: Object): Observable<HttpResponse<T>>{
    try{
    const result = this.http.post<T>(`http://dotnet-app.web-backend.svc.cluster.local/${endpoint}`, data, {
      withCredentials: true,
      observe: 'response',
      responseType: 'json',
      headers: { 'Content-Type': 'application/json' },
    })
    return  result;
  }
  catch (error: any){
    return new Observable(error)
  }
  }
  GetData<T>(endpoint: string): Observable<HttpResponse<T>>{
    try{
    const result = this.http.get<T>(`http://dotnet-app.web-backend.svc.cluster.local/${endpoint}`, {
      withCredentials: true,
      observe: 'response',
      responseType: 'json',
      headers: { 'Content-Type': 'application/json' },
    })
    return  result;
  }
  catch(error:any){
    return new Observable(error)
  }
  }
  // async PostData<T>(endpoint: string, data: Object): Promise<HttpResponse<T> | { status: number; message: string; error: any ; data:Array<object> }> {
  //   try {
  //     const response = await lastValueFrom(
  //       this.http.post<T>(`http://localhost:5192${endpoint}`, data, {
  //         withCredentials: true,
  //         observe: 'response',
  //         responseType: 'json', 
  //         headers: { 'Content-Type': 'application/json' },
  //       })
  //     );
  
  //     return response; 
  //   } catch (error: any) {
  //     // Handle error หาก response เป็น JSON แต่ responseType เป็น Blob
  //     if (
  //       error.error instanceof Blob &&
  //       error.error.type === 'application/problem+json'
  //     ) {
  //       const errorText = await error.error.text();
  //       const parsedError = JSON.parse(errorText);
  //       return {
  //         status: error.status,
  //         message: parsedError.message || error.message,
  //         error: parsedError,
  //         data: [{}],
  //       };
  //     } else {
  //       return {
  //         status: error.status,
  //         message: error.message,
  //         error: error.error,
  //         data: [{}],
  //       };
  //     }
  //   }
  // }
  
  // async GetData<T>(endpoint: string): Promise<HttpResponse<T> | { status: number; message: string; error: any ;}> {
  //   try {
  //     const response = await lastValueFrom(
  //       this.http.get<T>(`http://localhost:5192${endpoint}`, {
  //         withCredentials: true,
  //         observe: 'response',
  //         responseType: 'json', 
          
  //       })
  //     );
  
  //     return response; 
  //   } catch (error: any) {
  //     // Handle error หาก response เป็น JSON แต่ responseType เป็น Blob
  //     if (
  //       error.error instanceof Blob &&
  //       error.error.type === 'application/problem+json'
  //     ) {
  //       const errorText = await error.error.text();
  //       const parsedError = JSON.parse(errorText);
  //       return {
  //         status: error.status,
  //         message: parsedError.message || error.message,
  //         error: parsedError,
  //       };
  //     } else {
  //       return {
  //         status: error.status,
  //         message: error.message,
  //         error: error.error,
  //       };
  //     }
  //   }
  // }
}
