import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
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
    accountsService: AccountsService) {
    super('movements', firestore);
    this.collection = firestore.collection<Movement>(
      this.COLLECTION_NAME,
      ref => ref.orderBy('date', 'desc').limit(100)
    );
    // Load accounts
    accountsService.getListObservable();
  }

  public mapObjects() {
    return map((movements: any[]) =>
      movements.map(movement => {
        movement.date = movement.date.toDate();
        return movement as Movement;
      })
    );
  }

  public addDocument(movement: Movement): Promise<DocumentReference> {
    let batch = this.newBatch();
    movement.date = new Date(movement.date);
    const movementRef = super.getDocumentReference();
    batch.set(movementRef, {...movement});
    const handler = Movement.getHandler(movement.type);
    batch = handler.addBatchOperations(batch, movement, movement.account, false, movement.destinationAccount);
    return batch.commit().then();
  }

  public deleteById(id: string): Promise<void> {
    let batch = this.newBatch();
    const movement = this.getById(id);
    const movementRef = this.getDocumentReference(id);
    batch.delete(movementRef);
    const handler = Movement.getHandler(movement.type);
    batch = handler.addBatchOperations(batch, movement, movement.account, true, movement.destinationAccount);
    return batch.commit().then();
  }
}
