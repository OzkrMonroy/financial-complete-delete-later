import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '@/environments/environment';
import { QuoterService } from './quoter.service';

describe('PrequalifiedCustomerService', () => {
  let service: QuoterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoterService],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(QuoterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get the monthly payment', () => {
    service.qouter(12, 12000).then(resp => {
      expect(resp).toEqual({ monthlyPayment: 200, quotationAmount: 12000, quotationTerm: 12 })
    })
    const req = httpMock.expectOne(`${environment.env.hostURL}/quote`)
    expect(req.request.method).toBe('POST')
    req.flush({data: { monthlyPayment: 200 }})
  })

  it('Should return an error message when the term or amount is invalid', () => {
    service.qouter(12, 12000).catch(resp => {
      expect(resp).toEqual({error: ''})
    })
    const req = httpMock.expectOne(`${environment.env.hostURL}/quote`)
    expect(req.request.method).toBe('POST')
    req.flush({ error: '' }, { status: 400, statusText: 'Bad Request' })
  })
});
