import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { Account } from './accounts.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService extends FirestoreService<Account> {

  constructor(firestore: AngularFirestore) {
    super('accounts', firestore);
  }
}
