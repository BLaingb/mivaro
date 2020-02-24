import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface DocumentRecord {
  id?: string;
}

export class FirestoreService<T extends DocumentRecord> {
  protected readonly COLLECTION_NAME: string;
  protected collection: AngularFirestoreCollection<any>;
  protected listObservable: Observable<T[]>;
  protected listValues: T[];

  constructor(
    collectionName: string,
    firestore: AngularFirestore) {
    this.COLLECTION_NAME = collectionName;
    this.collection = firestore.collection<T>(
      this.COLLECTION_NAME
    );
    this.listObservable = this.collection.valueChanges({idField: 'id'}).pipe(
      this.mapObjects()
    );
    this.listObservable.subscribe((list: T[]) => {
      this.listValues = list;
    });
  }

  public mapObjects() {
    return map((objects: any[]) =>
      objects.map(object => {
        return { ...object } as T;
      })
    );
  }

  public addDocument(doc: T): Promise<DocumentReference> {
    return this.collection.add({ ...doc });
  }

  public getListObservable(): Observable<T[]> {
    return this.listObservable;
  }

  public getListValues(): T[] {
    return this.listValues;
  }

  public getById(id: string): T {
    return this.listValues.find((object: T) => object.id === id);
  }
}
