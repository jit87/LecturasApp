// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LecturasBBDDService } from '../services/lecturas-bbdd.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private _authService: AuthService, private _lecturasBBDDService: LecturasBBDDService) { }
  
  //Hay que vigilar siempre que no se añadan encabezados a peticiones que no nos interesan que las lleven (por ejemplo las url que consultan a APIs)
  //Aquí sólo queremos que el iterceptor manipule las peticiones al backend
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authService.getToken();
    const isAuthUrl = req.url.startsWith(this._authService.authUrl); 
    const isLecturasUrl = req.url.startsWith(this._lecturasBBDDService.url);
    
    if (token && (isAuthUrl || isLecturasUrl)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
