import { TestBed } from '@angular/core/testing';
import { ValidatorService } from '../validator-service';

import { ValidatorLengthService } from './validator-length-service';

describe('InputValidationsService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new ValidatorLengthService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it("[lengthValidation - success] should return the event when the value pass the regex validation", () => {
    let control = { value: '12123', length:5 }
    const resp = service.validation(control);
    expect(resp).toEqual(null)
  })
  it("[lengthValidation - error] should return false when the value does not pass the regex validation", () => {
    let control = { value: 'addsafdsfddasdfsdfsf', length:8 }
    const resp = service.validation(control);
    expect(resp).toEqual({ lengthValidation: true });
  })
 
  

  it("[lengthValidation - error] should return false when the value does not pass the regex validation", () => {
    let control = { value: '2345667789010' }
    const resp = service.validation(control);
    expect(resp).toEqual({ lengthValidation: true });
  })
});