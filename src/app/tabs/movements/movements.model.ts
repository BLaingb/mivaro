import { DocumentReference } from '@angular/fire/firestore/interfaces';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { MovementHandler, ExpenseHandler, IncomeHandler, ExchangeHandler } from './movements.handlers';

const handlers = {
  EGRESO: new ExpenseHandler(),
  INGRESO: new IncomeHandler(),
  INTERCUENTA: new ExchangeHandler()
};

export class Movement {
  id?: string;
  user: DocumentReference;
  type: 'EGRESO' | 'INGRESO' | 'INTERCUENTA';
  date: Date;
  amount: number;
  description: string;
  // Income sources
  source?: DocumentReference;
  // Expense categories
  category?: DocumentReference;
  // Income or Expense account
  account?: DocumentReference;
  isBilled?: boolean;
  // Account for Exchange
  sourceAccount?: DocumentReference;
  destinationAccount?: DocumentReference;

  static getHandler(type: 'EGRESO' | 'INGRESO' | 'INTERCUENTA'): MovementHandler {
    const handler = handlers[type];
    if (!handler) {
      throw new Error(`El tipo de movimiento ${type} no existe.`);
    }

    return handler;
  }
}
