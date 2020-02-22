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
    this.collection = firestore.collection<any>(
      this.COLLECTION_NAME,
      ref => ref.orderBy('date', 'desc').limit(100)
    );
  }

  public mapObjects() {
    return map((movements: DocumentChangeAction<any>[]) =>
      movements.map(movement => {
        const data = movement.payload.doc.data();
        data.date = data.date.toDate();
        const id = movement.payload.doc.id;
        return { id, ...data };
      })
    );
  }

  public addDocument(movement: Movement) {
    movement.date = new Date(movement.date);
    return super.addDocument(movement);
  }

}
