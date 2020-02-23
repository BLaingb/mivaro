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
import { FirestoreService } from 'src/app/shared/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class MovementsService extends FirestoreService<Movement> {
  constructor(firestore: AngularFirestore) {
    super('movements', firestore);
    this.collection = firestore.collection<Movement>(
      this.COLLECTION_NAME,
      ref => ref.orderBy('date', 'desc').limit(100)
    );
  }

  public mapObjects() {
    return map((movements: any[]) =>
      movements.map(movement => {
        movement.date = movement.date.toDate();
        return movement;
      })
    );
  }

  public addDocument(movement: Movement) {
    movement.date = new Date(movement.date);
    return super.addDocument(movement);
  }
}
