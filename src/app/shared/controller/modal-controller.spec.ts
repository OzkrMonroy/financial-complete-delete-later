import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { ModalController } from "./modal-controller"

describe('Modal controller tests', () => {
    let service: ModalController;
    let dialogService: DialogService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalController, DialogService, MessageService],
      imports: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(ModalController);
    dialogService = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
    it('Should call the showDialogConfirm function', () => {
        const showDialogSpy = spyOn(service, 'showDialogConfirm')
        service.showDialogError('Test', () => {})
        expect(showDialogSpy).toHaveBeenCalledTimes(1)
    })
    
    it('Should call the showDialogConfirm function', () => {
        const showDialogSpy = spyOn(service, 'showDialogConfirm')
        service.showDialogConfirmQuotation(6, 30000, () => {})
        expect(showDialogSpy).toHaveBeenCalledTimes(1)
    })
    
    it('Should call the dialogService', () => {
        const dialogServiceSpy = spyOn(dialogService, 'open')
        service.showDialogConfirmQuotation(6, 30000, () => {})
        expect(dialogServiceSpy).toHaveBeenCalledTimes(1)
    })
    
    it('Should close by the ref property', () => {
        // service.ref = { close: () => {} } as DynamicDialogRef
        service.showDialogConfirmQuotation(6, 30000, () => {})
        const refSpy = spyOn(service.ref!, 'close')
        service.ngOnDestroy()
        expect(refSpy).toHaveBeenCalledTimes(1)
    })
})