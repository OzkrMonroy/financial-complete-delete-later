import { AlertDialogType } from "@/app/types/alert-dialog";

export interface DialogConfirmModel {

    title: string,
    body?: string,
    okAction: Function,
    cancelAction?: Function,
    icon?: string,
    okText: string,
    cancelText: string,
    type: AlertDialogType
}