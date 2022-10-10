import { Component,  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorDPIService } from '../../../utils/validator/validator-dpi/validator-dpi-service';

@Component({
  selector: 'app-dpi-page',
  templateUrl: './dpi-page.component.html',
  styles: [
  ]
})
export class DpiPageComponent {
  form: FormGroup = this.formBuilder.group({
    dpi: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), this.validatordpi.validation]]
  });
  constructor(
    private formBuilder: FormBuilder, public validatordpi: ValidatorDPIService
   ){
  }
  
}
