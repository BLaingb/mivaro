import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Movement } from './movements.model';
import { MovementsService } from './movements.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.page.html',
  styleUrls: ['./movements.page.scss']
})
export class MovementsPage implements OnInit {
  movements: Movement[];

  constructor(
    private movementsService: MovementsService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.load();
  }

  async load() {
    const loader = await this.loadingCtrl.create();
    const errorToast = await this.toastCtrl.create({ message: 'Hubo un problema :('});
    loader.present();
    this.movementsService.getListObservable().subscribe(movs => {
      this.movements = movs;
      loader.dismiss();
    }, () => {
      loader.dismiss();
      errorToast.present();
    });
  }
}
