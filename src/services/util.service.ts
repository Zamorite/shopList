import { Injectable } from "@angular/core";
import { ToastController, Toast } from "ionic-angular";


@Injectable()
export class UtilService {

    toast: Toast
    
    constructor(
        private toastCtrl: ToastController
    ) {

    }

    showToast(msg: string , duration: number) {
        this.toast = this.toastCtrl.create({
            message: msg,
            duration: duration,
            position: 'bottom'
        });

        this.toast.present();
    }
    
}