import { PrequalifiedCustomerService } from '@/app/services/credits/prequalified/prequalified-customer.service';
import { ModalController } from '@/app/shared/controller/modal-controller';
import { PrequalifiedCustomer } from '@/app/shared/models/prequalified-customer';
import { Component  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ValidatorDPIService } from '../../../utils/validator/validator-dpi/validator-dpi-service';
import { ButtonColor } from 'src/app/types/button';


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
  customerDetails: PrequalifiedCustomer = {} as PrequalifiedCustomer;

  constructor(
    private formBuilder: FormBuilder,
    public validatordpi: ValidatorDPIService,
    private readonly route: Router, 
    private readonly prequalifiedCustomer: PrequalifiedCustomerService,
    public modalController: ModalController
   ){
  }

  ValidButton():ButtonColor{
    return (this.form.valid)?'primary':'disabled';
  }

  

 async validQueryDPI() {
    try {
      this.customerDetails = await this.prequalifiedCustomer.verifyCustomer(this.form.controls['dpi'].value)
      let navigationExtras: NavigationExtras = {
        state: {
          customerDetails: this.customerDetails
        }
      }
      this.route.navigate([`credits/prequalified-customer`],navigationExtras );

    } catch (error: any) {
      if(error && error.errors){
      this.route.navigate([`credits/quoter`] );
      }
  }
}

}
