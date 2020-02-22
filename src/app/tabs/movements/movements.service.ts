import { Injectable } from '@angular/core';
import { Expense, Movement } from './movements.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  static COLLECTION_NAME = 'movements';
  private movements: Observable<Movement[]>;
  private collection: AngularFirestoreCollection;
  // private collection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.collection = firestore.collection<Movement>(MovementsService.COLLECTION_NAME);
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
    movement.date = new Date(movement.date);
    return this.collection.add(
      {...movement}
    );
  }

  public getMovements() {
    return this.movements;
  }

}
