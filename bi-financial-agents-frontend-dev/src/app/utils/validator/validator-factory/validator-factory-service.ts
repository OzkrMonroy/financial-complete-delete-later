
import { InputRules } from '@/app/types/input';
import { Injectable } from '@angular/core';
import { ValidatorAddressService } from '../validator-address/validator-address-service';
import { ValidatorDPIService } from '../validator-dpi/validator-dpi-service';
import { ValidatorNumberService } from '../validator-number/validator-number-service';
import { ValidatorPhoneService } from '../validator-phone/validator-phone-service';
import { ValidatorService } from '../validator-service';
import { ValidatorStringService } from '../validator-string/validator-string-service';
import { ValidatorAmountService } from '../validator-amount/validator-amount-service';
import { ValidatorLengthService } from '../validator-length/validator-length-service';


@Injectable({
  providedIn: 'root',
})
export class ValidatorFactoryService {

  rule: InputRules = 'dpi';
  validator: ValidatorService | null = null;

  createValidatorKeyBoardEvent(): ValidatorService | null {


    if (this.validator !== null) {
      return this.validator;
    }

    if (this.rule === 'string') {

      this.validator = new ValidatorStringService();
    }

    if (this.rule === 'address') {

      this.validator = new ValidatorAddressService();
    }

    if (this.rule === 'amount') {
      this.validator = new ValidatorAmountService();
    }

    if (this.rule === 'dpi') {

      this.validator = new ValidatorNumberService();
    }

    if (this.rule === 'number') {
      this.validator = new ValidatorNumberService();
    }

    if (this.rule === 'phone') {
      this.validator = new ValidatorPhoneService();
    }
    return this.validator;

  }



  createValidator(): ValidatorService | null {
    let validator = this.createValidatorKeyBoardEvent();
    if (this.rule == 'dpi') {
      return new ValidatorDPIService();
    }
    if (validator == null) {
      if (this.rule === 'length') {
        return new ValidatorLengthService();
      }
    }

    return validator;

  }




}