import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Movement } from './movements.model';
import { MovementsService } from './movements.service';
import { HelpersService } from 'src/app/shared/helpers.service';

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
    private toastCtrl: ToastController,
    private helpersService: HelpersService
  ) {}

  ngOnInit() {
    this.load();
  }

  async load() {
    const loader = await this.loadingCtrl.create();
    loader.present();
    this.movementsService.getListObservable().subscribe(movs => {
      this.movements = movs;
      loader.dismiss();
    }, async () => {
      loader.dismiss();
      const errorToast = await this.toastCtrl.create({ message: 'Hubo un problema :('});
      errorToast.present();
    });
  }

  delete(id: string) {
    this.helpersService.handlePromise(
      this.movementsService.deleteById(id),
      {
        showToast: false
      }
    );
  }
}
