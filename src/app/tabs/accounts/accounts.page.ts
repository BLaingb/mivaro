import { Component, OnInit } from '@angular/core';
import { Account } from './accounts.model';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss']
})
export class AccountsPage implements OnInit {
  accounts: Account[];

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    this.accountsService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }
}
