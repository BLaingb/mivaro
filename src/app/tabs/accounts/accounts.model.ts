import { DocumentReference } from '@angular/fire/firestore';

export interface Account {
  user: DocumentReference;
  id?: string;
  startingBalance: number;
  balance: number;
}
