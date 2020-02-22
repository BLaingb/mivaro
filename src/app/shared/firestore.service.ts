import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class FirestoreService<T> {
  protected readonly COLLECTION_NAME: string;
  protected collection: AngularFirestoreCollection<any>;
  protected list: Observable<T[]>;

  constructor(
    collectionName: string,
    firestore: AngularFirestore) {
    this.COLLECTION_NAME = collectionName;
    this.collection = firestore.collection<any>(
      this.COLLECTION_NAME
    );
    this.list = this.collection.snapshotChanges().pipe(
      this.mapObjects()
    );
  }

  public mapObjects() {
    return map((objects: DocumentChangeAction<any>[]) =>
      objects.map(object => {
        const data = object.payload.doc.data();
        const id = object.payload.doc.id;
        return { id, ...data };
      })
    );
  }

  public addDocument(doc: T) {
    return this.collection.add({ ...doc });
  }

  public getList() {
    return this.list;
  }
}
