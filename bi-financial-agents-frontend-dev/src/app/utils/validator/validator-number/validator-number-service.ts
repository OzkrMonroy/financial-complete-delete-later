import { CustomAbstractControl } from '@/app/shared/models/validator-model/CustomAbstractControl';
import { ValidationErrors } from '@angular/forms';
import { ValidatorService } from '../validator-service';

export class ValidatorNumberService implements ValidatorService {

  validation(control: CustomAbstractControl): ValidationErrors | null {
    if (control.length) {
      return this.numberValidation(control.value, control.length);
    }
    else {
      return { numberValidation: true };
    }

  }



  numberValidation(
    valueToValidate: string,
    length: number,
  ): ValidationErrors | null {
    valueToValidate = valueToValidate.replace(/ /g, '');
    const regex = /^\d+$/g;
    if (valueToValidate.length > length) {

      return { numberValidation: true };
    }
    if (!regex.test(valueToValidate)) {

      return { numberValidation: true };

    } else {
      return null;
    }
  }
}