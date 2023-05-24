import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ICurrencyData } from '../models/currency.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  constructor(private http: HttpClient, private errorServvice: ErrorService) {
  }

  getAll<T extends ICurrencyData[]>(): Observable<T> {
    return this.http.get<T>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json').pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorServvice.handle(error.message);
    return throwError(() => error.message)
  }
}





