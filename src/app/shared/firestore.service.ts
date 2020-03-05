import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

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
    private firestore: AngularFirestore) {
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

  public getList(): Promise<T[]> {
    return this.getListObservable().pipe(take(1)).toPromise();
  }

  public getListValues(): T[] {
    return this.listValues || [];
  }

  public getById(id: string): T {
    const value = this.listValues.find((object: T) => object.id === id);
    return value;
  }

  public deleteById(id: string): Promise<void> {
    const doc = this.getById(id);
    if (!doc) {
      return Promise.reject('El objeto no existe');
    }
    return this.collection.doc(id).delete();
  }

  public getDocumentReference(id?: string): DocumentReference {
    if (!id) {
      return this.collection.doc(this.firestore.createId()).ref;
    }
    return this.collection.doc(id).ref;
  }

  protected newBatch(): firebase.firestore.WriteBatch {
    return this.firestore.firestore.batch();
  }
}
