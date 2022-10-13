import { CustomAbstractControl } from '@/app/shared/models/validator-model/CustomAbstractControl';
import { ValidationErrors } from '@angular/forms';
import { ValidatorService } from '../validator-service';

const answerAddressError={ addressValidation: true };

export class ValidatorAddressService implements ValidatorService {

  validation(control: CustomAbstractControl): ValidationErrors| null {
  
    return this.addressValidation(control.value);
  
  }


 private addressValidation(
    valueToValidate: string,
  ): ValidationErrors | null {
    const regex = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/gi;
    if (!regex.test(valueToValidate)) {
      return  answerAddressError;
    } else {
      return null;
    }
  }



}