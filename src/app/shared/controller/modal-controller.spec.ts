import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { of } from "rxjs";
import { DialogConfirmModel } from "../models/dialog-model/DialogConfirmModel";
import { ModalController } from "./modal-controller"

describe('Modal controller tests', () => {
  let service: ModalController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalController, DialogService, MessageService],
      imports: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(ModalController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Should call the showDialogConfirm function', () => {
    const showDialogSpy = spyOn(service, 'showDialogConfirm')
    service.showDialogError('Test', () => { })
    expect(showDialogSpy).toHaveBeenCalledTimes(1)
  })
  it('Should call the showDialogConfirm function', () => {
    const showDialogSpy = spyOn(service, 'showDialogConfirm')
    service.showDialogInfo('Test', () => { })
    expect(showDialogSpy).toHaveBeenCalledTimes(1)
  })

  it('Should call the showDialogConfirm function', () => {
    const showDialogSpy = spyOn(service, 'showDialogConfirm')
    service.showDialogConfirmQuotation(6, 30000, () => { })
    expect(showDialogSpy).toHaveBeenCalledTimes(1)
  })

  it('Should call the dialogService', () => {
    const dialogServiceSpy = spyOn(service, 'showDialogConfirm')
    service.showDialogConfirmQuotation(6, 30000, () => { })
    expect(dialogServiceSpy).toHaveBeenCalledTimes(1)
  })

  it('Should close by the ref property', () => {
    service.ref = { onClose: {subscribe: of(() => {})} } as any
    const blurSpy = spyOn(service, 'blur').and.callFake(() => {})
    service.showDialogConfirm({} as DialogConfirmModel)
    expect(blurSpy).toHaveBeenCalledTimes(1)
  })
})