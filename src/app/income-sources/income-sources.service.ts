import { Injectable } from '@angular/core';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { IncomeSource } from './income-source.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IncomeSourcesService extends FirestoreService<IncomeSource> {

  constructor(firestore: AngularFirestore) {
    super('incomeSource', firestore);
  }
}
