import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Expense, Movement } from './movements.model';
import { FirebaseApp } from 'angularfire2';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  static COLLECTION_NAME = 'Movements';
  private collection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.collection = firestore.collection<Movement>(MovementsService.COLLECTION_NAME);
  }

  private addExpense(expense: Expense) {
    this.collection.add({
      ...expense
    }).then(() => {
      console.log('Add expense done!');
    }).catch((e) => {
      console.log('Error: ', e);
    });
  }

  public addMovement(movement: Movement) {
    this.addExpense(movement as Expense);
  }

}
