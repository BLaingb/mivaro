import { DocumentReference } from '@angular/fire/firestore';

export interface Account {
  user?: DocumentReference;
  id?: string;
  type: 'CUENTA' | 'EFECTIVO' | 'CREDITO';
  name: string;
  startingBalance: number;
  balance: number;
}
