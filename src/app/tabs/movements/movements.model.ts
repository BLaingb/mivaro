import { DocumentReference } from '@angular/fire/firestore/interfaces';

export class Movement {
  id?: string;
  user: DocumentReference;
  type: string;
  date: Date;
  amount: number;
  description: string;

  static getIconAndClass(type: string): { icon: string, class: string } {
    switch (type) {
      case 'EGRESO':
        return { icon: 'remove-outline', class: 'expense-icon' };
      case 'INGRESO':
        return { icon: 'add-outline', class: 'income-icon' };
      case 'INTERCUENTA':
        return { icon: 'swap-horizontal-outline', class: 'exchange-icon' };
    }
  }
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
