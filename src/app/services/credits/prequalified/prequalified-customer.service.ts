import { PrequalifiedCustomer, PrequalifiedCustomerResponse } from '@/app/shared/models/prequalified-customer';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrequalifiedCustomerService {

  constructor(private readonly http: HttpClient) { }

  verifyCustomer(dpi: string = ''): Promise<PrequalifiedCustomer>{
    return new Promise<PrequalifiedCustomer>((resolve, reject) => {
      this.http.post<PrequalifiedCustomerResponse>(`${environment.env.hostURL}/loan-search`, { dpi }).subscribe({
        next: resp => {
          resolve(resp.data)
        },
        error: (error) => {
          reject(error.error)
        }
      })
    })
  }
}
