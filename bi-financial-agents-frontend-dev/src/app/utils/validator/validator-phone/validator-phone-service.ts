import { CustomAbstractControl } from '@/app/shared/models/validator-model/CustomAbstractControl';
import { ValidationErrors } from '@angular/forms';
import { ValidatorService } from '../validator-service';

export class ValidatorPhoneService implements ValidatorService {

  validation(control: CustomAbstractControl): ValidationErrors| null {
    if (control.length && control.key){
        return this.phoneValidation(control.value, control.length, control.key);
    }
    else  {
        return { phoneValidation: true };
    }     

  }

  phoneValidation(
    valueToValidate: string,
    length: number,
    key: string,
  ): ValidationErrors | null {
    if (valueToValidate.length > length && key.length <= 1) {
      return { phoneValidation: true };
    }
    const regex = /^(([234567]\d+)|[234567])$/g;
    let prb = regex.test(valueToValidate);

    if (prb || key.length > 1) {
      return null;
    } else {
      return { phoneValidation: true }; 
    }
  }
}