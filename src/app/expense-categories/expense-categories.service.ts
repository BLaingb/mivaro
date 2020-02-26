import { Injectable } from '@angular/core';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ExpenseCategory } from './expense-categories.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoriesService extends FirestoreService<ExpenseCategory> {

  constructor(firestore: AngularFirestore) {
    super('category', firestore);
  }
}
