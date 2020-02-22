import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Account } from './accounts.model';
import { map } from 'rxjs/operators';
import { FirestoreService } from 'src/app/shared/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService extends FirestoreService<Account>{

  constructor(firestore: AngularFirestore) {
    super('accounts', firestore);
  }
}
