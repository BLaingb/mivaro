import { Component, OnInit } from '@angular/core';
import { Account } from './accounts.model';
import { AccountsService } from './accounts.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss']
})
export class AccountsPage implements OnInit {
  accounts: Account[];

  constructor(
    private accountsService: AccountsService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {}

  async ngOnInit() {
    const loader = await this.loadingCtrl.create();
    loader.present();
    this.accountsService.getListObservable().subscribe(accounts => {
      this.accounts = accounts;
      loader.dismiss();
    });
  }

  getIcon(account: Account): string {
    return Account.getIcon(account.type);
  }

  async delete(id: string) {
    const loader = await this.loadingCtrl.create();
    loader.present();
    const toast =  await this.toastCtrl.create({
      message: '¡La cuenta ha sido eliminada!'
    });
    this.accountsService.deleteById(id).catch((e) => {
      toast.message = e.message;
    }).finally(() => {
      loader.dismiss();
      toast.present();
    });
  }
}
