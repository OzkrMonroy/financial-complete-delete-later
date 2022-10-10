import { TestBed } from '@angular/core/testing';
import { ValidatorAddressService } from '../validator-address/validator-address-service';
import { ValidatorAmountService } from '../validator-amount/validator-amount-service';

import { ValidatorDPIService } from '../validator-dpi/validator-dpi-service';
import { ValidatorLengthService } from '../validator-length/validator-length-service';
import { ValidatorNumberService } from '../validator-number/validator-number-service';
import { ValidatorPhoneService } from '../validator-phone/validator-phone-service';
import { ValidatorStringService } from '../validator-string/validator-string-service';

import { ValidatorFactoryService } from './validator-factory-service';

describe('InputValidationsService', () => {
  let factory: ValidatorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    factory = TestBed.inject(ValidatorFactoryService);

  });

  it('should be created', () => {
    expect(factory).toBeTruthy();
  });

  
  it("[dpiValidation - success] should return the event when the value pass the regex validation", () => {
    factory.rule= 'dpi'
    const resp = factory.createValidator();
    expect(resp).toEqual(new ValidatorDPIService())
  })

  it("[strValidation - success] should return the event when the value pass the regex validation", () => {
    factory.rule= 'string'
    const resp = factory.createValidatorKeyBoardEvent();
    expect(resp).toEqual(new ValidatorStringService())
  })

  it("[strValidation - success] should return the event when the value pass the regex validation", () => {
    factory.rule= 'address'
    const resp = factory.createValidatorKeyBoardEvent();
    expect(resp).toEqual(new ValidatorAddressService())
  })

  it("[strValidation - success] should return the event when the value pass the regex validation", () => {
    factory.rule= 'amount'
    const resp = factory.createValidatorKeyBoardEvent();
    expect(resp).toEqual(new ValidatorAmountService())
  })

  it("[strValidation - success] should return the event when the value pass the regex validation", () => {
    factory.rule= 'length'
    const resp = factory.createValidator();
    expect(resp).toEqual(new ValidatorLengthService())
  })

  it("[strValidation - success] should return the event when the value pass the regex validation", () => {
    factory.rule= 'number'
    const resp = factory.createValidatorKeyBoardEvent();
    expect(resp).toEqual(new ValidatorNumberService())
  })


  it("[phoneValidation - success] should return the event when the value pass the regex validation", () => {
    factory.rule= 'phone'
    let resp = factory.createValidatorKeyBoardEvent();
        resp = factory.createValidatorKeyBoardEvent();

    expect(resp).toEqual(new ValidatorPhoneService())
  })
});