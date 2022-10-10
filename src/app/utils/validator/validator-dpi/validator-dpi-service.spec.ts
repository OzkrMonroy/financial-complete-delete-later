import { CustomAbstractControl } from '@/app/shared/models/validator-model/CustomAbstractControl';
import { TestBed } from '@angular/core/testing';
import {   ValidationErrors } from '@angular/forms';

import { ValidatorDPIService } from './validator-dpi-service';

describe('InputValidationsService', () => {
  let service: ValidatorDPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new ValidatorDPIService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("[validation cui - success] should return the null when the value pass the  validation", () => {
    let control = { value: '2187822330501' }
    const resp = service.validation(control as CustomAbstractControl);
    expect(resp).toEqual(null);
  })

  it("[validation cui - success] should return the null when the value pass the  validation", () => {
    let control = { value: '3773036070101' }
    const resp = service.validation(control as CustomAbstractControl);
    expect(resp).toEqual(null);
  })
  it("[validation cui - error] should return ValidationErrors when the value does not pass the regex validation", () => {
    const event = { validationCui: true } as ValidationErrors;

    let control = { value: '187822330501' }
    const resp: ValidationErrors = service.validation(control as CustomAbstractControl) as ValidationErrors;
    expect(resp).toEqual(event);
  })

  it("[validation cui - error] should return ValidationErrors when the value does not pass the regex validation", () => {
    const event = { validationCui: true } as ValidationErrors;

    let control = { value: '1878223000000' }
    const resp: ValidationErrors = service.validation(control as CustomAbstractControl) as ValidationErrors;
    expect(resp).toEqual(event);
  })

  it("[validation cui - error] should return ValidationErrors when the value does not pass the regex validation", () => {
    const event = { validationCui: true } as ValidationErrors;

    let control = { value: '1878223999999' }
    const resp: ValidationErrors = service.validation(control as CustomAbstractControl) as ValidationErrors;
    expect(resp).toEqual(event);
  })


  it("[validation cui - error] should return ValidationErrors when the value does not pass the regex validation", () => {
    const event = { validationCui: true } as ValidationErrors;

    let control = { value: '1878223001099' }
    const resp: ValidationErrors = service.validation(control as CustomAbstractControl) as ValidationErrors;
    expect(resp).toEqual(event);
  })

  it("[validation cui - error] should return ValidationErrors when the value does not pass the regex validation", () => {
    const event = { validationCui: true } as ValidationErrors;

    let control = { value: '' }
    const resp: ValidationErrors = service.validation(control as CustomAbstractControl) as ValidationErrors;
    expect(resp).toEqual(event);
  })
  
});