import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Account } from '../../accounts/accounts.model';
import { AccountsService } from '../../accounts/accounts.service';
import { Movement } from '../movements.model';

@Component({
  selector: 'app-movement-item',
  templateUrl: './movement-item.component.html',
  styleUrls: ['./movement-item.component.scss']
})
export class MovementItemComponent implements OnInit {
  @Input() movement: Movement;
  icon: { name: string; class: string };
  account: Account;
  destinationAccount: Account;

  constructor(
    private accountsService: AccountsService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    const handler = Movement.getHandler(this.movement.type);
    this.icon = handler.getIcon();
    const ids = handler.getAccountIds(this.movement);

    this.account = this.accountsService.getById(ids[0]);

    this.destinationAccount = this.accountsService.getById(ids[1]);
  }
}
