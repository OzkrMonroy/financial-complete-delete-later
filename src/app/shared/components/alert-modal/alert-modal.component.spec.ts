import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogConfirmModel } from '../../models/dialog-model/DialogConfirmModel';
import { AlertModalComponent  } from '../alert-modal/alert-modal.component';
import { AlertModalComponentModule } from './alert-modal.component.module';


describe('AlertModalComponent', () => {
  let component: AlertModalComponent;
  let fixture: ComponentFixture<AlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertModalComponent],
      providers: [DialogService, MessageService, DynamicDialogRef,DynamicDialogConfig],
      imports: [ReactiveFormsModule, FormsModule,AlertModalComponentModule],
    }).compileComponents();
  });

  beforeEach(() => {
    let dialogModel: DialogConfirmModel = {
      type: 'confirm',
      title:'<span class="break-words text-[18px] py-[40px] text-blue-dark justify-center text-center">El nuevo monto es de <span class="font-bold">Q30,000.00 a 12 meses</span></span>',
      body: '<span class="break-words text-[18px] py-[40px] text-blue-dark justify-center text-center">¿Desea continuar?</span>',
      okAction: ()=>{
    },
    cancelAction: () => {
         
    },
  
    okText: 'Aceptar',
    cancelText: 'Cancelar',
    }

    fixture = TestBed.createComponent(AlertModalComponent);

 
    component = fixture.componentInstance;
    component.model = dialogModel;
    
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should close and call the okAction', () => {
    const refSpy = spyOn(component.ref, 'close')
    component.okAction()
    component.cancelAction()
    expect(refSpy).toHaveBeenCalledTimes(2)
  })
 

});
