import { Component } from '@angular/core';
import { ModalController } from '../../shared/controller/modal-controller';
import { PrequalifiedCustomer } from '../../shared/models/prequalified-customer';
import { DialogConfirmModel } from '../../shared/models/dialog-model/DialogConfirmModel';

@Component({
  selector: 'app-confirmation-screen',
  templateUrl: './confirmation-screen.component.html'
})
export class ConfirmationScreenComponent {

  customerDetails: PrequalifiedCustomer = {} as PrequalifiedCustomer

  constructor(
    public modalController: ModalController
  ) {

    // this.modalController.showDialogError("No se encontró información del crédito", () => {
    //   this.goTo('');

    // }

}

alertForm(){
  let dialogModel: DialogConfirmModel = {
    type: 'confirm',
    title:`<span class="break-words text-[18px] py-[40px] text-blue-dark justify-center text-center">Confirmar envió de formulario</span>`,
    
  okAction: ()=>{},
  cancelAction: ()=>{},

  okText: 'Aceptar',
  cancelText: 'Cancelar',
  };

       this.modalController.showDialogConfirm(dialogModel);

}

}