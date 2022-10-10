import { CustomAbstractControl } from "@/app/shared/models/validator-model/CustomAbstractControl";
import { ValidationErrors } from '@angular/forms';

export interface ValidatorService {

    validation(control: CustomAbstractControl): ValidationErrors| null ;

}


