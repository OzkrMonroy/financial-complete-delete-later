import { CustomAbstractControl } from '@/app/shared/models/validator-model/CustomAbstractControl';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidatorService } from '../validator-service';
const answerAmountError={ amountValidation: true };

@Injectable({
  providedIn: 'root',
})
export class ValidatorAmountService implements ValidatorService {

  validation(control: CustomAbstractControl): ValidationErrors| null {
    if (control.length){
        return this.numberValidation(control.value, control.length);
    }
    else  {
        return answerAmountError;
    }
  }

  thousandValidation(control: CustomAbstractControl): ValidationErrors | null {
    const isValid = Number(control.value || 0) % 1000 === 0
    
    return isValid ? null : { notThousandMultiple: true }
  }

 

  numberValidation(
    valueToValidate: string,
    length: number,
  ): ValidationErrors | null {

    const regex = /^\d+$/g;
    if (valueToValidate.length > length) {
      return answerAmountError;
    }
    if (!regex.test(valueToValidate)) {
       return answerAmountError;
      
    } else {
      return null;
    }
  }
}