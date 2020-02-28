import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HelpersService } from 'src/app/shared/helpers.service';
import { Account } from './accounts.model';
import { AccountsService } from './accounts.service';

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
    private helpersService: HelpersService) {}

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
    this.helpersService.handlePromise(
      this.accountsService.deleteById(id),
      '¡La cuenta ha sido eliminada!'
    );
  }
}
