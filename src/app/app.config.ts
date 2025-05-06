import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStateService } from '../services/data.service/user-data.service';


const authInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // console.log('AuthInterceptor running for URL:', req.url);
  // เรียก inject ที่นี่ตรงๆได้ (Angular จะเรียกฟังก์ชันนี้ในบริบทการฉีด)
  console.log('AuthInterceptor url:', req.url);
  const router = inject(Router);
  const loginStateService = inject(LoginStateService);
  return next(req).pipe(
    catchError(error => {
      console.log('AuthInterceptor caught error:', error.status);
      if (error.status === 401) {
        console.log('Unauthorized request detected in interceptor');
        // นำทางไปหน้า login
        // loginStateService.setLoginState(true);
      }
      return throwError(() => error);
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptorFn])
    ),
  ],
};