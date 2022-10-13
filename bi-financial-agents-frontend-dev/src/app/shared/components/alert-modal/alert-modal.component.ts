import { Component } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { DialogConfirmModel } from '../../models/dialog-model/DialogConfirmModel';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { ButtonColor } from '@/app/types/button';



@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css' ]
})
export class AlertModalComponent{
  
   model: DialogConfirmModel={
    type: 'confirm',
    title:'<span class="break-words text-[18px] py-[40px] text-blue-dark justify-center text-center">Texto por defecto</span>',
    body: '<span class="break-words text-[18px] py-[40px] text-blue-dark justify-center text-center">Texto por defecto 2</span>',
    okAction: ()=>{},
    cancelAction: () => { },
    okText: 'Aceptar',
    cancelText: 'Cancelar',
  };
  constructor(public ref: DynamicDialogRef,public config: DynamicDialogConfig){
    if(this.config && this.config.data) {
      this.model=this.config.data.dialogData;
    }
  }

  colorBotton(): ButtonColor {
    return this.model.type === 'confirm'?'primary': 'secondary';
  }
  okAction() {
         
    this.ref.close();
    if(this.model.okAction) {
      this.model.okAction();
    }
  }
  cancelAction(){
    this.ref.close();
    if(this.model.cancelAction) {
      this.model.cancelAction();
    }
  }
}
