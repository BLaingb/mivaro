import { DocumentReference } from '@angular/fire/firestore/interfaces';

export class Movement {
  user: DocumentReference;
  type: string;
  id?: string;
  date: Date;
  amount: number;
  description: string;
}

export class Expense extends Movement {
  category: string;
  account: string;
  isBilled: boolean;
}

export class Income extends Movement {
  source: string;
  account: DocumentReference;
}

export class Exchange extends Movement {
  sourceAccount: DocumentReference;
  destinationAccount: DocumentReference;
}
