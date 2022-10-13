
import { TestBed } from '@angular/core/testing';
import { ValidatorService } from '../validator-service';

import { ValidatorNumberService } from './validator-number-service';

describe('InputValidationsService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new ValidatorNumberService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it("[phoneValidation - success] should return the event when the value pass the regex validation", () => {
    let control = { value: '12123', length:5 }
    const resp = service.validation(control);
    expect(resp).toEqual(null)
  })
  it("[phoneValidation - error] should return false when the value does not pass the regex validation", () => {
    let control = { value: 'addsafdsfdsf', length:34 }
    const resp = service.validation(control);
    expect(resp).toEqual({ numberValidation: true });
  })
 
  it("[addressValidation - error] should return false when the value does not pass the regex validation", () => {
    let control = { value: '2345667789010', length:5 }
    const resp = service.validation(control);
    expect(resp).toEqual({ numberValidation: true });
  })

  it("[addressValidation - error] should return false when the value does not pass the regex validation", () => {
    let control = { value: '2345667789010' }
    const resp = service.validation(control);
    expect(resp).toEqual({ numberValidation: true });
  })
});