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
  public async handlePromise(promise: Promise<any>, successMessage?: string, errorMessage?: string) {
    const loader = await this.loadingCtrl.create();
    loader.present();
    const toast =  await this.toastCtrl.create({
      message: successMessage || '¡Éxito!'
    });
    promise.catch((e) => {
      toast.message = errorMessage || e.message;
    }).finally(() => {
      loader.dismiss();
      toast.present();
    });
  }
}
