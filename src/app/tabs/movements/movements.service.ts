import { Injectable } from '@angular/core';
import { Movement } from './movements.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  static COLLECTION_NAME = 'movements';
  private movements: Observable<Movement[]>;
  private collection: AngularFirestoreCollection<any>;

  constructor(firestore: AngularFirestore) {
    this.collection = firestore.collection<any>(
      MovementsService.COLLECTION_NAME,
      ref => ref.orderBy('date', 'desc').limit(100)
    );
    this.movements = this.collection.snapshotChanges().pipe(
      this.mapMovements()
    );
  }

  public mapMovements() {
    return map((movements: DocumentChangeAction<any>[]) =>
      movements.map(movement => {
        const data = movement.payload.doc.data();
        data.date = data.date.toDate();
        const id = movement.payload.doc.id;
        return { id, ...data };
      })
    );
  }

  public addMovement(movement: Movement) {
    movement.date = new Date(movement.date);
    return this.collection.add({ ...movement });
  }

  public getMovements() {
    return this.movements;
  }
}
