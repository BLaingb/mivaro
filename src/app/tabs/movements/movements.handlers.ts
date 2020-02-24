import { Movement } from './movements.model';

export interface MovementHandler {
  getIcon(): { name: string; class: string };
  runTransaction();
  getAccountDetails(movement: Movement);
}

export class ExpenseHandler implements MovementHandler {
  getIcon() {
    return { name: 'remove-outline', class: 'expense-icon' };
  }

  runTransaction() {}

  getAccountDetails(expense: Movement) {}
}

export class IncomeHandler implements MovementHandler {
  getIcon() {
    return { name: 'add-outline', class: 'income-icon' };
  }

  runTransaction() {}

  getAccountDetails(income: Movement) {}
}

export class ExchangeHandler implements MovementHandler {
  getIcon() {
    return { name: 'swap-horizontal-outline', class: 'exchange-icon' };
  }

  runTransaction() {}

  getAccountDetails(income: Movement) {}
}