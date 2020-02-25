import { Movement } from './movements.model';
import { AccountsService } from '../accounts/accounts.service';

export interface MovementHandler {
  getIcon(): { name: string; class: string };
  runTransaction();
  getAccountIds(movement: Movement): string[];
}

export class ExpenseHandler implements MovementHandler {
  getIcon() {
    return { name: 'remove-outline', class: 'expense-icon' };
  }

  runTransaction() {}

  getAccountIds(expense: Movement): string[] {
    return [expense.account.id];
  }
}

export class IncomeHandler implements MovementHandler {
  getIcon() {
    return { name: 'add-outline', class: 'income-icon' };
  }

  runTransaction() {}

  getAccountIds(income: Movement): string[] {
    return [income.account.id];
  }
}

export class ExchangeHandler implements MovementHandler {
  getIcon() {
    return { name: 'swap-horizontal-outline', class: 'exchange-icon' };
  }

  runTransaction() {}

  getAccountIds(exchange: Movement): string[] {
    return [exchange.sourceAccount.id, exchange.destinationAccount.id];
  }
}
