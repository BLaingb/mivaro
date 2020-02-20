import { Injectable } from '@angular/core';
import { Expense, Movement } from './movements.model';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  static COLLECTION_NAME = 'movements';
  private movements: Observable<Movement[]>;
  // private collection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.movements = firestore.collection<Movement>(MovementsService.COLLECTION_NAME).valueChanges();
  }

  public addExpense(expense: Expense) {
    // this.collection.add({
    //   ...expense
    // }).then(() => {
    //   console.log('Add expense done!');
    // }).catch((e) => {
    //   console.log('Error: ', e);
    // });
  }

  public addMovement(movement: Movement) {
    this.addExpense(movement as Expense);
  }

  public getMovements() {
    return this.movements;
  }

}
