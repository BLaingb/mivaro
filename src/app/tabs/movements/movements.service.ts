import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { map } from 'rxjs/operators';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { Movement } from './movements.model';
import { AccountsService } from '../accounts/accounts.service';

@Injectable({
  providedIn: 'root'
})
export class MovementsService extends FirestoreService<Movement> {
  constructor(
    firestore: AngularFirestore,
    private accountsService: AccountsService) {
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
        return movement as Movement;
      })
    );
  }

  public addDocument(movement: Movement) {
    movement.date = new Date(movement.date);
    return super.addDocument(movement);
  }
}
