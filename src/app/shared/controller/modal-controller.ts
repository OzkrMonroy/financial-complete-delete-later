
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Injectable, OnDestroy } from '@angular/core';
import { AlertModalComponent } from '@/app/shared/components/alert-modal/alert-modal.component';
import { DialogConfirmModel } from '../models/dialog-model/DialogConfirmModel';
import { StringUtils } from '@/app/utils/stringutils/string-utils';
import { BLUR_APP, ID_ROOT_APP, ID_ROOT_APP_HEADER } from '@/app/utils/constApp';
const FILTER_APP: string = `filter: blur(${BLUR_APP}px);`;
@Injectable({
    providedIn: 'root',
})
export class ModalController implements OnDestroy {
    itemApp!: HTMLElement
    itemHeader!: HTMLElement
    ref: DynamicDialogRef | null = null;

    constructor(public dialogService: DialogService, public messageService: MessageService) {

    }

    showDialogInfo(message: string, okAction: Function) {
        let dialogModel: DialogConfirmModel = {
            type: 'info',
            title: message,
            okAction: okAction,
            okText: 'Aceptar',
            cancelText: 'Cancelar',
        };

        this.showDialogConfirm(dialogModel);
    }

    showDialogError(message: string, okAction?: Function) {
        let dialogModel: DialogConfirmModel = {
            type: 'error',
            title: message,
            okAction: okAction,
            okText: 'Aceptar',
            cancelText: 'Cancelar',
        };

        this.showDialogConfirm(dialogModel);
    }

    showDialogConfirmQuotation(term: number, monto: number, okAction: Function, cancelAction?: Function) {
        let dialogModel: DialogConfirmModel = {
            type: 'confirm',
            title: `<span class="break-words text-[18px] py-[40px] text-blue-dark justify-center text-center">El nuevo monto es de <span class="font-bold">${StringUtils.formatAmount(monto)} a ${term} meses</span></span>`,
            body: '<span class="break-words text-[18px] py-[40px] text-blue-dark justify-center text-center">¿Desea continuar?</span>',
            okAction: okAction,
            cancelAction: cancelAction,

            okText: 'Aceptar',
            cancelText: 'Cancelar',
        };

        this.showDialogConfirm(dialogModel);

    }

    showDialogConfirm(model: DialogConfirmModel) {
        this.ref = this.dialogService.open(AlertModalComponent, {
            width: '85vw',
            height: '85vh',
            contentStyle: {
                "background": "transparent",
                "display": "flex",
                "flex-direction": "column",
                "justify-content": "center"
            },
            data: { dialogData: model },
            showHeader: false
        });
        this.blur(true);

        this.ref.onClose.subscribe(() => {
            this.blur(false);
        });



    }

    blur(active: boolean) {
        this.itemApp = document.getElementById(ID_ROOT_APP) as HTMLElement;
        this.itemHeader = document.getElementById(ID_ROOT_APP_HEADER) as HTMLElement;
        
        if (active) {
            this.itemApp.setAttribute("style", FILTER_APP);
            this.itemHeader.setAttribute("style", FILTER_APP);
        } else {
            this.itemApp.setAttribute("style", '');
            this.itemHeader.setAttribute("style", '');
        }

    }



    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

}