import { Component, OnInit } from '@angular/core';
import { Account } from './accounts.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {
  accounts: Account[];

  constructor() { }

  ngOnInit() {
  }

}
