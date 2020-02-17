import { DocumentReference } from 'angularfire2/firestore';

export class Movement {
  id?: string;
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
  source: string;
  account: DocumentReference;
}

export class Exchange extends Movement {
  sourceAccount: DocumentReference;
  destinationAccount: DocumentReference;
}
