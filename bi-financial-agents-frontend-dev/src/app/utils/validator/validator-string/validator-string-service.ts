import { CustomAbstractControl } from '@/app/shared/models/validator-model/CustomAbstractControl';
import { ValidationErrors } from '@angular/forms';
import { ValidatorService } from '../validator-service';

export class ValidatorStringService implements ValidatorService {

  validation(control: CustomAbstractControl): ValidationErrors| null {
        return this.stringValidation(control.value);     
  }

 private stringValidation(    valueToValidate: string,  ): ValidationErrors | null {
    const regex = /^(([a-záéíóúÑäëïöü\'0-9])|( ))+$/gi;
    if (!regex.test(valueToValidate)) {
      return { stringValidation: true };
    } else {
      return null;
    }
  }
}