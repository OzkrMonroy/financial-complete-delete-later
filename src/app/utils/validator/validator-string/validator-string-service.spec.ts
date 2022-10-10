import { TestBed } from '@angular/core/testing';

import { ValidatorService } from '../validator-service';

import { ValidatorStringService } from './validator-string-service';

describe('InputValidationsService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new ValidatorStringService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it("[stringValidation - success] should return the event when the value pass the regex validation", () => {
    let control = { value: 'as tr' }
    const resp = service.validation(control);
    expect(resp).toEqual(null)
  })
  it("[stringValidation - error] should return false when the value does not pass the param validation ", () => {
    let control = { value: '#$´?', length:8 }
    const resp = service.validation(control);
    expect(resp).toEqual({ stringValidation: true });
  })
 
  
});