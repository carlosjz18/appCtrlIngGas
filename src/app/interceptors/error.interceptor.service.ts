import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {MessageService} from "primeng/api";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private messageService: MessageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          if (error.error instanceof ErrorEvent) {
            // client-side error
            this.messageService.add({
              severity: 'error',
              summary: 'Error Servidor',
              detail: error.error.message,
              sticky: true
            });
          } else {
            // server-side error
            let content: string[] = [];
            content.push(error.error.statusCode + ' - ' + error.error.status);
            content.push(error.error.message);
            this.messageService.add({
              severity: 'error',
              summary: 'Error Servidor',
              detail: content.join('\n'),
              sticky: true
            });
          }
          return throwError(() => error);
        }));
  }

}
