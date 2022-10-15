import { Quoter, QuoterRequest, QuoterResponse } from '@/app/shared/models/quoter';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuoterService {

  constructor(private readonly http: HttpClient) { }

  qouter(term:number, amount:number): Promise<Quoter>{
    return new Promise<Quoter>((resolve, reject) => {
      let data: QuoterRequest ={
        quotationAmount: amount,
        quotationTerm: term
      }
      this.http.post<QuoterResponse>(`${environment.env.hostURL}/quote`, data).subscribe({
        next: resp => {
          resp.data.quotationAmount=amount;
          resp.data.quotationTerm= term;
          resolve(resp.data);
        },
        error: (error) => {
          reject(error.error)
        }
      })
    })
  }
}
