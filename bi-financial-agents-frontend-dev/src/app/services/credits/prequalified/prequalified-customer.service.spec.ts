import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PrequalifiedCustomerService } from './prequalified-customer.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { prequalfiedErrorMock, prequalifiedDetailsMock } from '@/app/shared/mocks/testing-prequalified';
import { environment } from '@/environments/environment';

describe('PrequalifiedCustomerService', () => {
  let service: PrequalifiedCustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrequalifiedCustomerService],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(PrequalifiedCustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get the prequalified customer details', () => {
    service.verifyCustomer('4747473630987').then(resp => {
      expect(resp).toEqual(prequalifiedDetailsMock.data)
    })
    const req = httpMock.expectOne(`${environment.env.hostURL}/loan-search`)
    expect(req.request.method).toBe('POST')
    req.flush(prequalifiedDetailsMock)
  })

  it('Should return an error message when the customer is not a pre qualified one.', () => {
    service.verifyCustomer().catch(resp => {
      expect(resp).toEqual(prequalfiedErrorMock)
    })
    const req = httpMock.expectOne(`${environment.env.hostURL}/loan-search`)
    expect(req.request.method).toBe('POST')
    req.flush(prequalfiedErrorMock, { status: 400, statusText: 'Bad Request' })
  })
});
