import { CustomAbstractControl } from '@/app/shared/models/validator-model/CustomAbstractControl';
import { ValidationErrors } from '@angular/forms';
import { ValidatorService } from '../validator-service';
const answerAmountError={ amountValidation: true };

export class ValidatorAmountService implements ValidatorService {

  validation(control: CustomAbstractControl): ValidationErrors| null {
    if (control.length){
        return this.numberValidation(control.value, control.length);
    }
    else  {
        return answerAmountError;
    }     

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