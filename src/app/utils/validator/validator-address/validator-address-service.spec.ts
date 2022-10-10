import { TestBed } from '@angular/core/testing';
import { ValidatorService } from '../validator-service';

import { ValidatorAddressService } from './validator-address-service';

describe('InputValidationsService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new ValidatorAddressService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it("[addressValidation - success] should return the event when the value pass the regex validation", () => {
    let control = { value: 'jose@gmail.com', length:15 }
    const resp = service.validation(control);
    expect(resp).toEqual(null)
  })
  it("[addressValidation - error] should return false when the value does not pass the regex validation", () => {
    let control = { value: '', length:15 }
    const resp = service.validation(control);
    expect(resp).toEqual({ addressValidation: true });
  })
 
});