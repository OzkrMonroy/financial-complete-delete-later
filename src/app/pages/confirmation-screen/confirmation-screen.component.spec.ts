import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationScreenComponent } from './confirmation-screen.component'
import { MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalController } from '../../shared/controller/modal-controller';

describe('ConfirmationScreenComponent', () => {
  let component: ConfirmationScreenComponent;
  let fixture: ComponentFixture<ConfirmationScreenComponent>;
  let modalC: ModalController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationScreenComponent ],

      
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [ DialogService, MessageService, DynamicDialogRef,DynamicDialogConfig, ModalController]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationScreenComponent);
    component = fixture.componentInstance;
    modalC = TestBed.inject(ModalController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should display the confirm dialog', () => {
    const modalSpy = spyOn(modalC, 'showDialogConfirm');
    component.alertForm()
    expect(modalSpy).toHaveBeenCalledTimes(1)
  })
});
