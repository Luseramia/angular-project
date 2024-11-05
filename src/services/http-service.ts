import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  async PostData(endpoint:string ,data:Object)  {    
    try {
        const response = await lastValueFrom(
          this.http.post(`http://localhost:5192${endpoint}`, data, { withCredentials: true ,observe: 'response'})
        );
        return response;
      } catch (error) {
        console.error('Error in PostData:', error);
        throw error;
      }
  }
}
