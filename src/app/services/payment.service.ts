import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomApi } from '../models/custom-api.model';
import { Payment } from '../models/payment.model';

const LIST_PAYMENTS_URL = "http://localhost:3000/tasks"
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  params: CustomApi;
  payments: Payment[];

  constructor(public http: HttpClient) { }

  getPayments(params: CustomApi | any): Observable<Payment[]>{
    debugger;
    return this.http.get<Payment[]>(LIST_PAYMENTS_URL, {
      params: params
    });
  }
}
