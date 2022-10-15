import { ModalController } from '@/app/shared/controller/modal-controller';
import { ButtonColor } from '@/app/types/button';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quoter-page',
  templateUrl: './quoter-page.component.html',
  styles: [
  ]
})
export class QuoterPageComponent {
 
  form: FormGroup = this.formBuilder.group({});
  isAmountInvalid = true;

  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private readonly route: Router, ){
  }

  ValidButton():ButtonColor{
  
    return (this.form.valid && !this.isAmountInvalid)?'primary':'disabled';
  }

  requestCredit() {
      this.modalController.showDialogInfo("Pendiente de crear",()=>{});
  }

  cancel() {
    this.route.navigate([`credits/`] );
  }

  changeIsValidValue(valid: boolean){
    this.isAmountInvalid = valid
  }
}
