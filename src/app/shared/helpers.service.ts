import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }

  // Add a loader and toast message to a promise
  public async handlePromise(promise: Promise<any>, options?: { successMessage?: string, errorMessage?: string, showToast?: boolean}) {
    const loader = await this.loadingCtrl.create();
    loader.present();
    let message = '¡Éxito!';
    let errorMessage: string = null;
    let showToast = true;
    if (options) {
      message = options.successMessage || '¡Éxito!';
      showToast = options.showToast !== undefined ? options.showToast : true;
      errorMessage = options.errorMessage || null;
    }
    const toast =  await this.toastCtrl.create({ message, duration: 2000 });
    promise.catch((e) => {
      toast.message = errorMessage || e.message;
    }).finally(() => {
      loader.dismiss();
      if (showToast) { toast.present(); }
    });
  }
}
