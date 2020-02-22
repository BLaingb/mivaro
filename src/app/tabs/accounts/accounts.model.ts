import { DocumentReference } from '@angular/fire/firestore';

export interface Account {
  user: DocumentReference;
  id?: string;
  name: string;
  startingBalance: number;
  balance: number;
}
