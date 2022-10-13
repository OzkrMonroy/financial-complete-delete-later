import { CustomAbstractControl } from '@/app/shared/models/validator-model/CustomAbstractControl';
import { ValidationErrors } from '@angular/forms';
import { ValidatorService } from '../validator-service';

export class ValidatorLengthService implements ValidatorService {

  validation(control: CustomAbstractControl): ValidationErrors| null {
    if ( control.length){
        return this.lengthValidation(control.value, control.length);
    }
    else  {
        return { lengthValidation: true };
    }     

  }

 


  lengthValidation(
    valueToValidate: string,
    length: number,
  ): ValidationErrors | null {
    const cleanValue = valueToValidate.replace(/Q/g, '')
    if (cleanValue.length > length) {
      return { lengthValidation: true };
    }
    return null;
  }

}