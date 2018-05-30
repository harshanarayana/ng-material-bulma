import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

export class HeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('id_token')) {
      const authReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + localStorage.getItem('id_token')
        )
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
