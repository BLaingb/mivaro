import { DocumentReference } from '@angular/fire/firestore';

export class Account {
  user?: DocumentReference;
  id?: string;
  type: 'CUENTA' | 'EFECTIVO' | 'CREDITO';
  name: string;
  balance: number;

  static getIcon(type: string): string {
    switch (type) {
      case 'CUENTA':
        return 'briefcase-outline';
      case 'EFECTIVO':
        return 'cash-outline';
      case 'CREDITO':
        return 'card-outline';
    }
  }
}
