import { TestBed } from '@angular/core/testing';
import { ValidatorService } from '../validator-service';

import { ValidatorPhoneService } from './validator-phone-service';

describe('InputValidationsService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new ValidatorPhoneService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it("[phoneValidation - success] should return the event when the value pass the regex validation", () => {
    let control = { value: '55450070', length:8, key:'8' }
    const resp = service.validation(control);
    expect(resp).toEqual(null)
  })

  it("[phoneValidation - success] should return false when the value does not pass the regex validation", () => {
    let control = { value: '55450070', length:8,key:'back' }
    const resp = service.validation(control);
    expect(resp).toEqual(null);
  })

  it("[phoneValidation - error] should return false when the value does not pass the param validation ", () => {
    let control = { value: '55450070', length:8 }
    const resp = service.validation(control);
    expect(resp).toEqual({ phoneValidation: true });
  })
 
  it("[phoneValidation - error] should return false when the value does not pass the regex validation", () => {
    let control = { value: '123456785', length:8,key:'8' }
    const resp = service.validation(control);
    expect(resp).toEqual({ phoneValidation: true });
  })

  
  it("[phoneValidation - error] should return false when the value does not pass the regex validation", () => {
    let control = { value: '2345667789010' }
    const resp = service.validation(control);
    expect(resp).toEqual({ phoneValidation: true });
  })
});