import { Movement } from './movements.model';
import { DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

export interface MovementHandler {
  getIcon(): { name: string; class: string };
  addBatchOperations(
    batch: firebase.firestore.WriteBatch,
    movement: Movement,
    accountRef: DocumentReference,
    inverse: boolean,
    destRef?: DocumentReference): firebase.firestore.WriteBatch;
  getAccountIds(movement: Movement): string[];
}

export class ExpenseHandler implements MovementHandler {
  getIcon() {
    return { name: 'remove-outline', class: 'expense-icon' };
  }

  addBatchOperations(
    batch: firebase.firestore.WriteBatch,
    movement: Movement,
    accountRef: DocumentReference,
    inverse: boolean = false): firebase.firestore.WriteBatch {
      const amount = inverse ? - movement.amount : movement.amount;
      batch.update(
        accountRef,
        { balance: firebase.firestore.FieldValue.increment(-amount)}
      );
      return batch;
  }

  getAccountIds(expense: Movement): string[] {
    return [expense.account.id];
  }
}

export class IncomeHandler implements MovementHandler {
  getIcon() {
    return { name: 'add-outline', class: 'income-icon' };
  }

  addBatchOperations(
    batch: firebase.firestore.WriteBatch,
    movement: Movement,
    accountRef: DocumentReference,
    inverse: boolean = false): firebase.firestore.WriteBatch {
      const amount = inverse ? - movement.amount : movement.amount;
      batch.update(
        accountRef,
        { balance: firebase.firestore.FieldValue.increment(amount)}
      );
      return batch;
  }

  getAccountIds(income: Movement): string[] {
    return [income.account.id];
  }
}

export class ExchangeHandler implements MovementHandler {
  getIcon() {
    return { name: 'swap-horizontal-outline', class: 'exchange-icon' };
  }

  addBatchOperations(
    batch: firebase.firestore.WriteBatch,
    movement: Movement,
    accountRef: DocumentReference,
    inverse: boolean = false,
    destRef: DocumentReference): firebase.firestore.WriteBatch {
      const amount = inverse ? - movement.amount : movement.amount;
      batch.update(
        accountRef,
        { balance: firebase.firestore.FieldValue.increment(-amount)}
      );
      batch.update(
        destRef,
        { balance: firebase.firestore.FieldValue.increment(amount)}
      );
      return batch;
  }

  getAccountIds(exchange: Movement): string[] {
    return [exchange.account.id, exchange.destinationAccount.id];
  }
}
