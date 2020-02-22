import { DocumentReference } from '@angular/fire/firestore/interfaces';

export class Movement {
  id?: string;
  user: DocumentReference;
  type: string;
  date: Date;
  amount: number;
  description: string;
}

export class Expense extends Movement {
  category: DocumentReference;
  account: DocumentReference;
  isBilled: boolean;
}

export class Income extends Movement {
  source: DocumentReference;
  account: DocumentReference;
}

export class Exchange extends Movement {
  sourceAccount: DocumentReference;
  destinationAccount: DocumentReference;
}
