import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Account } from './accounts.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  static COLLECTION_NAME = 'accounts';
  private accounts: Observable<Account[]>;
  private collection: AngularFirestoreCollection<any>;

  constructor(firestore: AngularFirestore) {
    this.collection = firestore.collection<any>(
      AccountsService.COLLECTION_NAME
    );
    this.accounts = this.collection.snapshotChanges().pipe(
      this.mapAccounts()
    );
  }

  public mapAccounts() {
    return map((accounts: DocumentChangeAction<any>[]) =>
      accounts.map(account => {
        const data = account.payload.doc.data();
        const id = account.payload.doc.id;
        return { id, ...data };
      })
    );
  }

  public getAccounts() {
    return this.accounts;
  }
}
